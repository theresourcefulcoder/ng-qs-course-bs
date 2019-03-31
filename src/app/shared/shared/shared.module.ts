import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/**
 * Common shared module for the application
 */
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    NgbModule
  ]
})
export class SharedModule { }
