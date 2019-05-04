import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { ListProductComponent } from './list-product/list-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { DeleteProductModalComponent } from './delete-product-modal/delete-product-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListProductComponent,
    ViewProductComponent,
    UpdateProductComponent,
    DeleteProductModalComponent
  ],
  imports: [
    SharedModule,
    ProductRoutingModule
  ],
  entryComponents: [
    DeleteProductModalComponent
  ]
})
export class ProductModule { }
