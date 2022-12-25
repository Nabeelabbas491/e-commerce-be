import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { NewComponent } from './new/new.component';
import { ProductComponent } from './product/product.component';
import { ShopTypeComponent } from './shop-type/shop-type.component';
import { UploadProductComponent } from './upload-product/upload-product.component';

const routes: Routes = [
    {
        path: 'upload',
        component: UploadProductComponent
    },
    {
        path: 'category',
        component: CategoryComponent
    },
    {
        path: 'shoptype',
        component: ShopTypeComponent
    },
    {
        path: 'new',
        component: NewComponent
    },
    {
        path: '',
        component: ProductComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ProductRoutingModule { }
