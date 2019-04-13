import { Params } from '@angular/router';

/**
 * Breadcrumb model
 */
export interface Breadcrumb {
  title: string;
  routerLink: string;
  queryParams: Params;
}
