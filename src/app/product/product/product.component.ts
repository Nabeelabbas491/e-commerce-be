import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from 'app/shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products = []
  constructor(private productService: ProductService, private cdr: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.getProducts()
  }

  async getProducts() {
    try {
      let response = await this.productService.getProducts()
      this.products = response['data']
      console.log("response..", this.products)
      this.cdr.detectChanges()
    } catch (e) {
      console.log("error", e)
    }
  }


}
