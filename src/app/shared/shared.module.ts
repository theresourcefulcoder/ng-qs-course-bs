import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/**
 * Common shared module for the application
 */
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FontAwesomeModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FontAwesomeModule
  ]
})
export class SharedModule { }
