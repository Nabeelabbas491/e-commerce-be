import { createViewChild } from '@angular/compiler/src/core';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { AuthService } from 'app/shared/services/auth.service';
import { ProductService } from 'app/shared/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef
  dataSource = []
  dummyCategoryName = ''

  constructor(private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  async save(data, index) {
    try {
      if (!data.name.length) return;
      let result = await this.productService.postCategory(data)
      this.dataSource[index] = { ...result['response'], isEdit: false }
      this.toastr.success("Category created successfully!!")
      this.cdr.detectChanges()
    } catch (e) {
      this.toastr.error(e.error)
    }
  }

  async update(data, idx) {
    try {
      if (!data.name.length) return;
      await this.productService.updateCategory(data)
      this.dataSource[idx].isEdit = false
      this.toastr.success("Category updated successfully!!")
      this.cdr.detectChanges()
      return;
    } catch (e) { }
  }

  async getData() {
    try {
      let result: any = await this.productService.getCategories()
      this.dataSource = result.response
      this.dataSource = this.dataSource.map((m) => { return { ...m, isEdit: false } })
      this.cdr.detectChanges()
    } catch (e) { }
  }

  addRow() {
    this.dataSource.unshift({
      name: '',
      user: this.authService.getUser()._id,
      isEdit: true,
    })
    setTimeout(() => {
      this.inputRef['valueAccessor']._elementRef.nativeElement.focus()
    })
  }

  onEdit(item) {
    item.isEdit = true;
    this.dummyCategoryName = item.name
  }

  async delete(id, index) {
    try {
      await this.productService.deleteCategory(id)
      this.dataSource.splice(index, 1)
      this.toastr.success("Category deleted successfully!!")
      this.cdr.detectChanges()
    } catch (e) { }
  }

  onCancel(item, idx) {
    if (item._id) {
      item.isEdit = false;
      item.name = this.dummyCategoryName
    } else {
      this.dataSource.splice(idx, 1)
    }
  }

  onEnterKeyPress(item, idx) {
    this.inputRef['valueAccessor']._elementRef.nativeElement.blur()
    item._id ? this.update(item, idx) : this.save(item, idx)
  }

}
