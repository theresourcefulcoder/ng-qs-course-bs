import { NgModule } from '@angular/core';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    SharedModule,
    PageNotFoundRoutingModule
  ]
})
export class PageNotFoundModule { }
