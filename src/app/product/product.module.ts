import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadProductComponent } from './upload-product/upload-product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatchHeightModule } from 'app/shared/directives/match-height.directive';
import { TagInputModule } from 'ngx-chips';
import { CustomFormsModule } from 'ngx-custom-validators';
import { QuillModule } from 'ngx-quill';
import { UiSwitchModule } from 'ngx-ui-switch';
import { CategoryComponent } from './category/category.component';
import { ShopTypeComponent } from './shop-type/shop-type.component';
import { NewComponent } from './new/new.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [
    UploadProductComponent,
    CategoryComponent,
    ShopTypeComponent,
    NewComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgxSpinnerModule,
    ArchwizardModule,
    CustomFormsModule,
    MatchHeightModule,
    NgbModule,
    UiSwitchModule,
    QuillModule.forRoot(),
    NgSelectModule,
    TagInputModule
  ]
})
export class ProductModule { }
