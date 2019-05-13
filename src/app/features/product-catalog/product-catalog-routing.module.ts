import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductCatalogComponent } from './product-catalog.component';
import { AuthenticationGuard } from 'src/app/shared/guards/authentication.guard';
import { AuthorizationGuard } from 'src/app/shared/guards/authorization.guard';

/**
 * Defined routes for the feature ProductCatalogRoutingModule
 */
const routes: Routes = [
  { path: '',
    component: ProductCatalogComponent,
    canActivate: [AuthenticationGuard, AuthorizationGuard],
    data: { breadcrumb: 'Product Catalog', roles: ['basic'] }
  }
];

/**
 * Feature routing module for ProductCatalogModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCatalogRoutingModule { }
