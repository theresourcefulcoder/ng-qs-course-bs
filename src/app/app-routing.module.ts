import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Defined routes for the root AppRoutingModule
 */
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'suppliers', loadChildren: './features/supplier/supplier.module#SupplierModule' },
  { path: 'products', loadChildren: './features/product/product.module#ProductModule' },
  { path: 'product-catalog', loadChildren: './features/product-catalog/product-catalog.module#ProductCatalogModule' }
];

/**
 * Root routing module for the application
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
