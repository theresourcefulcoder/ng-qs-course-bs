import { NgModule } from '@angular/core';

import { ProductCatalogRoutingModule } from './product-catalog-routing.module';
import { ProductCatalogComponent } from './product-catalog.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProductCatalogComponent,
    ProductCardComponent
  ],
  imports: [
    ProductCatalogRoutingModule,
    SharedModule
  ]
})
export class ProductCatalogModule { }
