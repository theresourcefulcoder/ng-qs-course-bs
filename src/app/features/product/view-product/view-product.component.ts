import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Product } from '../product.model';
import { AlertService } from '../../../shared/services/alert.service';
import { HttpService } from '../../../shared/services/http.service';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit, OnDestroy {
  /**
   * Locally scoped variables
   */
  productSub: Subscription;
  product: Product;
  productId: number;

  /**
   * Variables bound to DOM elements
   */
  @ViewChild('image') image: ElementRef;

  /**
   * Constructor which injects services
   */
  constructor(private alertService: AlertService,
              private httpService: HttpService,
              private activatedRoute: ActivatedRoute) { }

  /**
   * OnInit lifecycle hook
   */
  ngOnInit(): void {
    this.productId = +this.activatedRoute.snapshot.paramMap.get('id');

    // Fetch the product
    this.productSub = this.httpService.read(environment.serverApiPath + 'products/' + this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(
        data => {
          this.product = data;
        },
        error => {
          this.alertService.error(`An error occurred fetching the product. ${error.status} ${error.statusText} - ${error.url}`, false);
        }
      );
  }

  /**
   * OnDestroy Lifecycle Hook
   */
  ngOnDestroy(): void {
    if (this.productSub) { this.productSub.unsubscribe(); }
  }

  /**
   * Function to reset the image url when an invalid image path is entered
   */
  updateUrl(): void {
    // Reset the url to the no product image file
    this.image.nativeElement.src = './assets/images/products/no-product-image.png';
  }
}
