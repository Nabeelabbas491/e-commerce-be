import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'app/shared/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { HighlightService } from 'app/shared/services/highlight.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  // highlighted: boolean = false;

  // autoplay
  public swiperAutoplayConfig: SwiperConfigInterface = {
    spaceBetween: 30,
    centeredSlides: true,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  products = []
  selectedProduct = {}
  constructor(private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) {
    // config.interval = 10000;
    // config.wrap = false;
    // config.keyboard = false;
    // config.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.getProducts()
  }

  async getProducts() {
    try {
      let response = await this.productService.getProducts()
      this.products = response['data']
      this.cdr.detectChanges()
    } catch (e) {
      console.log("error", e)
    }
  }

  edit(objectId) {
    this.router.navigate(['/product/upload'], { queryParams: { id: objectId } })
  }

  async delete(id, idx) {
    try {
      await this.productService.deleteProduct(id)
      this.products.splice(idx, 1)
      this.toastr.success("Product delete successfully!")
      this.cdr.detectChanges()
    } catch (e) {
      console.log("error..", e)
    }
  }

  openModal(content) {
    this.modalService.open(content, {
      size: 'xxl',
      ariaLabelledBy: 'modal-basic-title',
      // scrollable: true,
      // backdrop: true,
      // keyboard: false,
      centered: true
    }).result.then((result) => { }, (reason) => { });
  }


}
