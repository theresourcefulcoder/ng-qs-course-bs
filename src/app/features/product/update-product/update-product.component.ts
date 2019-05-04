import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription, noop, forkJoin, Observable, of } from 'rxjs';

import { Product } from '../product.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { Supplier } from '../../supplier/supplier.model';
import { duplicateCodeValidator } from '../validators/duplicate-code.validator';
import { ProductValidator } from '../validators/product.validator';

@Component({
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit, OnDestroy {
  /**
   * Locally scoped variables
   */
  form: FormGroup;
  products: Product[] = [];
  product: Product;
  productId: number;
  httpSub: Subscription;
  suppliers: Supplier[] = [];
  sub: Subscription;
  combinedData$: Observable<any>;

  /**
   * Variables bound to DOM elements
   */
  @ViewChild('image') image: ElementRef;

  /**
   * Constructor which injects services
   */
  constructor(private alertService: AlertService,
              private formBuilder: FormBuilder,
              private httpService: HttpService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  /**
   * OnInit lifecycle hook
   */
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [null],
      code: [null],
      name: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])],
      cost: [null, Validators.compose([Validators.required])],
      supplierId: [null, Validators.compose([Validators.required])],
      imageUrl: [null, Validators.compose([Validators.required])],
      packageDimensions: [null, Validators.compose([Validators.required])],
      packageWeight: [null, Validators.compose([Validators.required])],
      rating: [null, Validators.compose([Validators.required])],
      category: [null, Validators.compose([Validators.required])],
      active: [false],
    }, { validator: ProductValidator.markupValidator });

    this.productId = +this.activatedRoute.snapshot.paramMap.get('id');

    // Observables to use with forkJoin
    let product$: Observable<Product> = of(undefined);
    const suppliers$: Observable<Supplier[]> = this.httpService.read(environment.serverApiPath + 'suppliers');
    const products$: Observable<Product[]> = this.httpService.read(environment.serverApiPath + 'products');

    if (this.productId > 0) {
      product$ = this.httpService.read(environment.serverApiPath + 'products/' + this.activatedRoute.snapshot.paramMap.get('id'));
    }

    // Observable that combines 3 HTTP calls
    this.combinedData$ = forkJoin([ suppliers$, products$, product$ ]);

    this.sub = this.combinedData$
      .subscribe(
        ([suppliers, products, product]) => {
          this.suppliers = suppliers;
          this.products = products;
          this.product = product;

          if (this.product) {
            // Update the form control values with the loaded product values
            this.form.controls.id.setValue(this.product.id);
            this.form.controls.code.setValue(this.product.code);
            this.form.controls.name.setValue(this.product.name);
            this.form.controls.description.setValue(this.product.description);
            this.form.controls.price.setValue(this.product.price);
            this.form.controls.cost.setValue(this.product.cost);
            this.form.controls.supplierId.setValue(this.product.supplierId);
            this.form.controls.imageUrl.setValue(this.product.imageUrl);
            this.form.controls.packageDimensions.setValue(this.product.packageDimensions);
            this.form.controls.packageWeight.setValue(this.product.packageWeight);
            this.form.controls.rating.setValue(this.product.rating);
            this.form.controls.category.setValue(this.product.category);
            this.form.controls.active.setValue(this.product.active);
          }

          this.form.controls.code.setValidators(
            Validators.compose([Validators.required, duplicateCodeValidator(this.product, this.products)]));
        },
        error => {
          this.alertService.error(`An error occurred fetching the data. ${error.status} ${error.statusText} - ${error.url}`, false);
        }
      );
  }

  /**
   * OnDestroy lifecycle hook
   */
  ngOnDestroy(): void {
    if (this.httpSub) { this.httpSub.unsubscribe(); }
    if (this.sub) { this.sub.unsubscribe(); }
  }

  // Convenience form getters
  get id() { return this.form.get('id'); }
  get code() { return this.form.get('code'); }
  get name() { return this.form.get('name'); }
  get description() { return this.form.get('description'); }
  get price() { return this.form.get('price'); }
  get cost() { return this.form.get('cost'); }
  get supplierId() { return this.form.get('supplierId'); }
  get imageUrl() { return this.form.get('imageUrl'); }
  get packageDimensions() { return this.form.get('packageDimensions'); }
  get packageWeight() { return this.form.get('packageWeight'); }
  get rating() { return this.form.get('rating'); }
  get category() { return this.form.get('category'); }
  get active() { return this.form.get('active'); }

  /**
   * Function to handle form submittal.
   *
   * @param product - form values to process
   */
  submitForm(product: Product): void {
    if (product.id === null) {
      this.createProduct(product);
    } else {
      this.updateProduct(product);
    }
  }

  /**
   * Function to check the validity of a form field
   *
   * @param field - field being checked
   */
  isInvalid(field: any): boolean {
    return field.invalid && (field.dirty || field.touched);
  }

  /**
   * Function to create a product
   *
   * @param product - product to create
   */
  createProduct(product: Product): void {
    this.httpSub = this.httpService.create(environment.serverApiPath + 'products', product)
      .subscribe(
        noop,
        error => {
          this.alertService.error(`An error occurred creating the product. ${error.status} ${error.statusText} - ${error.url}`, true);
          this.router.navigate(['/products'], { queryParamsHandling: 'preserve' });
        },
        () => {
          this.alertService.success(`Product (${product.name}) was successfully created.`, true);
          this.router.navigate(['/products'], { queryParamsHandling: 'preserve' });
        }
      );
  }

  /**
   * Function to update the product
   *
   * @param product - product to update
   */
  updateProduct(product: Product): void {
    this.httpSub = this.httpService.update(environment.serverApiPath + 'products', product.id, product)
      .subscribe(
        noop,
        error => {
          this.alertService.error(`An error occurred creating the product. ${error.status} ${error.statusText} - ${error.url}`, true);
          this.router.navigate(['/products'], { queryParamsHandling: 'preserve' });
        },
        () => {
          this.alertService.success(`Product (${product.name}) was successfully updated.`, true);
          this.router.navigate(['/products'], { queryParamsHandling: 'preserve' });
        }
      );
  }

  /**
   * Function to reset the image url when an invalid image path is entered
   */
  updateUrl(): void {
    // Reset the url to the no product image file
    this.image.nativeElement.src = './assets/images/products/no-product-image.png';
  }
}
