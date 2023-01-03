import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/services/auth.service';
import { ProductService } from 'app/shared/services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-product',
  templateUrl: './upload-product.component.html',
  styleUrls: ['./upload-product.component.scss']
})
export class UploadProductComponent implements OnInit {

  submitted = false;
  colors = ['Red', 'Orange', "Yellow", "Green", "Blue", "Indigo", "voilet", "purple", "Pink", "Silver", "Gold", "Brown", "Grey", "Black", "White", "Beige", "Maroon"]
  sizes = ['xs', 'sm', "md", "lg", "xl", 'xxl', 'xxxl']
  selectedImages: any = []
  selectedFiles: any = []
  hoverImageIdx = null
  categories = []
  shopTypes = []
  productForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    productDescription: new FormControl(''),
    color: new FormControl(''),
    size: new FormControl(''),
    images: new FormControl(''),
    price: new FormControl('', [Validators.required]),
    categpry: new FormControl('', [Validators.required]),
    shopType: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    weight: new FormControl(''),
    id: new FormControl(null),
    user: new FormControl(null)
  });

  constructor(private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService) {
    this.productForm.value.user = this.authService.getUser()._id
  }

  async ngOnInit() {
    await this.getDropdownsData()
    this.getQueryParams()
  }

  async getDropdownsData() {
    try {
      let categories = await this.productService.getCategories()
      this.categories = categories['response']
      let shopTypes = await this.productService.getShopTypes()
      this.shopTypes = shopTypes['data']
      console.log(this.categories, this.shopTypes)
    } catch (e) { }
  }

  getQueryParams() {
    try {
      this.route.queryParams.subscribe(async (response) => {
        if (Object.keys(response).length) {
          let product: any = await this.productService.getProductById(response.id)
          this.productForm.patchValue({
            productName: product.data.productName,
            productDescription: product.data.productDescription,
            color: product.data.color,
            size: product.data.size,
            price: product.data.price,
            categpry: product.data.categpry,
            shopType: product.data.shopType,
            quantity: product.data.quantity,
            weight: product.data.weight,
            id: product.data._id,
          })
          let images = product.data.images
          this.selectedImages = images
          this.selectedFiles = Array(this.selectedImages.length).fill(null)
        }
      })
    } catch (e) { }
  }

  get f() {
    return this.productForm.controls;
  }

  updateImage(ev) {
    let files = ev.target.files
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i])
      let url: any = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files[i]))
      this.selectedImages.push({ url: url, fileName: files[i].name })
    }
  }

  async removeImage(i) {
    this.selectedImages.splice(i, 1)
    this.selectedFiles.splice(i, 1)
    if (!this.selectedFiles.length) this.productForm.patchValue({ images: "" })
  }

  async save() {
    this.submitted = true
    if (!this.selectedImages.length) return
    try {
      if (this.productForm.valid) {
        this.spinner.show(undefined,
          {
            type: 'ball-triangle-path',
            size: 'medium',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: true
          });
        this.selectedFiles = this.selectedFiles.filter(Boolean)

        // console.log("images..", this.selectedImages)
        // console.log("files..", this.selectedFiles)

        let cloudinaryImages = []
        if (this.selectedFiles.length) {
          let formData = new FormData
          Array.from(this.selectedFiles).forEach((f: any) => formData.append('file', f))
          let result = await this.productService.getCloudinrayImage(formData)
          // console.log("result..", result)
          cloudinaryImages = result['data']
        }

        // console.log("Product form", this.productForm.value)
        if (this.productForm.value.id) {
          let productImages = this.selectedImages.filter(image => image.public_id)
          this.productForm.value.images = productImages.concat(cloudinaryImages)
          // this.selectedFiles = Array(this.selectedImages.length).fill(null)
        } else {
          delete this.productForm.value.id
          this.productForm.value.images = cloudinaryImages
        }
        let response = await this.productService.saveProduct(this.productForm.value)
        // console.log("response...", response['data'])
        if (this.productForm.value.id) {
          this.getQueryParams()
        } else {
          this.productForm.reset()
          this.selectedFiles = []
          this.selectedImages = []
          this.submitted = false
        }
        this.spinner.hide()
        this.toastr.success(`Product ${this.productForm.value.id ? 'updated' : 'created'} successfully!`)
      }
    } catch (error) {
      this.spinner.hide()
      console.log("error..", error)
      this.toastr.error(error.error)
    }
  }

}
