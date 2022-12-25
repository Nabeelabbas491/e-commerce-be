import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
  hoverImageIdx = null
  categories = []
  shopTypes = []
  productForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    productDescription: new FormControl(''),
    color: new FormControl(''),
    size: new FormControl(''),
    images: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    categpry: new FormControl('', [Validators.required]),
    shopType: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    weight: new FormControl('')
  });

  constructor(private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  async ngOnInit() {
    try {
      let categories = await this.productService.getCategories()
      this.categories = categories['response']
      let shopTypes = await this.productService.getShopTypes()
      this.shopTypes = shopTypes['data']
      console.log(this.categories, this.shopTypes)
    } catch (e) { }
  }

  onSubmit(form) {
    console.log(form.value)
  }

  get f() {
    return this.productForm.controls;
  }

  onReactiveFormSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    console.log(this.productForm.value);
  }

  selectedImages: any = []
  selectedFiles: any = []
  updateImage(ev) {
    let files = ev.target.files
    this.selectedFiles = [];
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i])
      let url: any = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files[i]))
      this.selectedImages.push(url)
    }
  }

  cancelImage(i) {
    this.selectedImages.splice(i, 1)
    this.selectedFiles.splice(i, 1)
    if (!this.selectedImages.length) this.productForm.patchValue({ images: "" })
  }

  async save() {
    if (!this.productForm.value.images) return
    try {
      this.submitted = true
      console.log("Product form", this.productForm.value)
      if (this.productForm.valid) {
        this.spinner.show(undefined,
          {
            type: 'ball-triangle-path',
            size: 'medium',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: true
          });
        let images = []
        for (let i = 0; i < this.selectedFiles.length; i++) {
          let formData = new FormData()
          formData.append("file", this.selectedFiles[i])
          let result = await this.productService.getCloudinrayImage(formData)
          images.push(result)
        }
        this.productForm.value.images = images
        let response = await this.productService.saveProduct(this.productForm.value)
        this.spinner.hide()
        this.toastr.success("Product created successfully!")
        this.productForm.reset()
      }
    } catch (error) {
      this.spinner.hide()
      console.log("error..", error)
    }
  }

}
