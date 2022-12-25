import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'app/shared/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop-type',
  templateUrl: './shop-type.component.html',
  styleUrls: ['./shop-type.component.scss']
})
export class ShopTypeComponent implements OnInit {


  @ViewChild('input') inputRef: ElementRef
  dataSource = []
  dummyShopTypeName = ''
  noActionAbleShopTypes = ["Male", "Female"]

  constructor(private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  async save(data, index) {
    try {
      if (!data.shopType.length) return;
      let result = await this.productService.postShopType(data)
      this.dataSource[index] = { ...result['data'], isEdit: false }
      this.toastr.success("Shop type created successfully!!")
      this.cdr.detectChanges()
    } catch (e) {
      this.toastr.error(e.error)
    }
  }

  async update(data, idx) {
    try {
      if (!data.shopType.length || this.noActionAbleShopTypes.includes(data.shopType)) return;
      await this.productService.updateShopType(data)
      this.dataSource[idx].isEdit = false
      this.toastr.success("Shop type updated successfully!!")
      this.cdr.detectChanges()
      return;
    } catch (e) { }
  }

  async getData() {
    try {
      let result: any = await this.productService.getShopTypes()
      this.dataSource = result.data
      this.dataSource = this.dataSource.map((m) => { return { ...m, isEdit: false } })
      this.cdr.detectChanges()
    } catch (e) { }
  }

  addRow() {
    this.dataSource.unshift({
      shopType: '',
      isEdit: true,
    })
    setTimeout(() => {
      this.inputRef['valueAccessor']._elementRef.nativeElement.focus()
    })
  }

  onEdit(item) {
    if (this.noActionAbleShopTypes.includes(item.shopType)) return;
    item.isEdit = true;
    this.dummyShopTypeName = item.shopType
  }

  async delete(item, index) {
    try {
      if (this.noActionAbleShopTypes.includes(item.shopType)) return;
      await this.productService.deleteShopType(item._id)
      this.dataSource.splice(index, 1)
      this.toastr.success("Shop type deleted successfully!!")
      this.cdr.detectChanges()
    } catch (e) { }
  }

  onCancel(item, idx) {
    if (item._id) {
      item.isEdit = false;
      item.shopType = this.dummyShopTypeName
    } else {
      this.dataSource.splice(idx, 1)
    }
  }

  onEnterKeyPress(item, idx) {
    this.inputRef['valueAccessor']._elementRef.nativeElement.blur()
    item._id ? this.update(item, idx) : this.save(item, idx)
  }

}
