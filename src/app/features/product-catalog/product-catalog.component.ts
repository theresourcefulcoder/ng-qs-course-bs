import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, forkJoin, Subscription } from 'rxjs';

import { Product } from '../product/product.model';
import { Supplier } from '../supplier/supplier.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit, OnDestroy {
  /**
   * Locally scoped variables
   */
  suppliers: Supplier[] = [];
  products: Product[] = [];
  sub: Subscription;
  combinedData$: Observable<any>;

  /**
   * Constructor which injects services
   */
  constructor(private alertService: AlertService,
              private httpService: HttpService) { }

  /**
   * OnInit lifecycle hook
   */
  ngOnInit(): void {
    // Fetch all the products, client side paging will be used
    const products$: Observable<Product[]> = this.httpService.read(environment.serverApiPath + 'products');

    // Fetch the suppliers to be used later to lookup the supplier names
    const suppliers$: Observable<Supplier[]> = this.httpService.read(environment.serverApiPath + 'suppliers');

    // Observable that combines 2 HTTP calls
    this.combinedData$ = forkJoin([ products$, suppliers$ ]);

    // Subscribe to the forkJoin Observable
    this.sub = this.combinedData$
      .subscribe(
        ([ products, suppliers ]) => {
          this.products = products;
          this.suppliers = suppliers;
        },
        error => {
          this.alertService.error(`An error occurred fetching the data. ${error.status} ${error.statusText} - ${error.url}`, false);
        }
      );
  }

  /**
   * OnDestroy Lifecycle Hook
   */
  ngOnDestroy(): void {
    if (this.sub) { this.sub.unsubscribe(); }
  }
}
