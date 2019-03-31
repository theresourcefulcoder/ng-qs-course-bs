import { Component } from '@angular/core';

import { environment } from '../../../environments/environment';

/**
 * Core footer component
 *
 * @example
 * <app-footer></app-footer>
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  /**
   * Locally scoped variables
   */
  today: number = Date.now();
  version: string = environment.version;
}
