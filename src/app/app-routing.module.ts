import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Defined routes for the root AppRoutingModule
 */
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

/**
 * Root routing module for the application
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
