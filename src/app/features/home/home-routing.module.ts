import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

/**
 * Defined routes for the HomeRoutingModule
 */
const routes: Routes = [
  { path: 'home', component: HomeComponent }
];

/**
 * Routing module for the HomeModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
