import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProductComponent } from './list-product/list-product.component';
import { AuthenticationGuard } from 'src/app/shared/guards/authentication.guard';
import { AuthorizationGuard } from 'src/app/shared/guards/authorization.guard';
import { ViewProductComponent } from './view-product/view-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';

/**
 * Defined routes for the feature ProductRoutingModule
 */
const routes: Routes = [
  { path: '',
    component: ListProductComponent,
    canActivate: [AuthenticationGuard, AuthorizationGuard],
    data: { breadcrumb: 'Manage Products', roles: ['admin'] }
  },
  { path: ':id',
    component: ViewProductComponent,
    canActivate: [AuthenticationGuard, AuthorizationGuard],
    data: { breadcrumb: 'View Product', roles: ['admin'] }
  },
  { path: ':id/update',
    component: UpdateProductComponent,
    canActivate: [AuthenticationGuard, AuthorizationGuard],
    data: { breadcrumb: 'Add / Update Product', roles: ['admin'] }
  }
];

/**
 * Feature routing module for ProductModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
