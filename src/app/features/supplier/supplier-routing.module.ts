import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierComponent } from './supplier.component';
import { AuthenticationGuard } from 'src/app/shared/guards/authentication.guard';
import { AuthorizationGuard } from 'src/app/shared/guards/authorization.guard';

/**
 * Defined routes for the root SupplierRoutingModule
 */
const routes: Routes = [
  { path: '',
    component: SupplierComponent,
    canActivate: [AuthenticationGuard, AuthorizationGuard],
    data: { breadcrumb: 'Manage Suppliers', roles: ['admin'] }
  }
];

/**
 * Feature routing module for SupplierModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
