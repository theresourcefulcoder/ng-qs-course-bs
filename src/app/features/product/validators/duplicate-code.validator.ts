import { ValidatorFn, AbstractControl } from '@angular/forms';

import { Product } from '../product.model';

export function duplicateCodeValidator(currentProduct: Product, products: Product[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const searchedProduct = products.find(product => product.code === control.value);

    // Exclude the product's own code
    if (currentProduct) {
      return searchedProduct && searchedProduct.code !== currentProduct.code
        ? { duplicateCode: true } : null;
    }

    return searchedProduct ? { duplicateCode: true } : null;
  };
}
