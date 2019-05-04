import { ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';

/**
 * Custom product validators
 */
export class ProductValidator {
  /**
   * Cross-field validator to enforce a minimum 25% markup
   *
   * @param control - FormGroup to validate against
   */
  static markupValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const price: number = +control.get('price').value;
    const cost: number = +control.get('cost').value;
    const minimumMarkupPrice: number = +(cost * 1.25).toFixed(2); // Determine price with 25% markup

    return price >= minimumMarkupPrice ? null : { markupTooLow: minimumMarkupPrice };
  }
}
