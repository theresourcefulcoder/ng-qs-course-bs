import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription, Observable, forkJoin } from 'rxjs';
import { faPlus, faInfoCircle, faPencilAlt, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Supplier } from '../../supplier/supplier.model';
import { Product } from '../product.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { DeleteProductModalComponent } from '../delete-product-modal/delete-product-modal.component';

@Component({
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit, OnDestroy {
  /**
   * Locally scoped variables
   */
  suppliers: Supplier[] = [];
  productsData: Product[] = [];
  filteredProducts: Product[] = [];
  productsTotal = 0;
  page: number;
  pageSize = 5;
  filterCriteria: string;
  sub: Subscription;
  combinedData$: Observable<any>;

  /**
   * Font Awesome Icons
   */
  faPlus: IconDefinition = faPlus;
  faInfo: IconDefinition = faInfoCircle;
  faPencil: IconDefinition = faPencilAlt;
  faTrash: IconDefinition = faTrashAlt;

  /**
   * Constructor which injects services
   */
  constructor(private activatedRoute: ActivatedRoute,
              private alertService: AlertService,
              private httpService: HttpService,
              private modal: NgbModal) { }

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
          this.productsData = products;
          this.filteredProducts = products;
          this.productsTotal = products.length;
          this.suppliers = suppliers;

          this.filter = this.activatedRoute.snapshot.queryParamMap.get('filter') || '';
          this.page = +this.activatedRoute.snapshot.queryParamMap.get('paging') || 1;
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

  /**
   * Get function which returns the filter criteria
   */
  get filter(): string {
    return this.filterCriteria;
  }

  /**
   * Set function which will filter the products based
   * on the filterCriteria variable
   */
  set filter(value: string) {
    this.filterCriteria = value;
    this.filteredProducts = this.filterProducts(value);
    this.productsTotal = this.filteredProducts.length;
  }

  /**
   * Get function which will apply paging to the data
   */
  get products(): Product[] {
    return this.filteredProducts
      .map((product, i) => ({id: i + 1, ...product}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  /**
   * Function to delete a product
   *
   * @param productToDelete - the product to delete
   */
  deleteProduct(productToDelete: Supplier): void {
    // Open the modal
    const modalRef = this.modal.open(DeleteProductModalComponent, { size: 'lg' });

    // Process the results of the modal
    modalRef.result.then(result => {
      if (result && result.id) {
        // Remove the deleted product
        this.productsData = this.productsData.filter(product => product.id !== result.id);
        this.filteredProducts = [...this.productsData];
        // Update the product total
        this.productsTotal = this.productsData.length;
      }
    });

    // Pass data to the modal
    modalRef.componentInstance.product = productToDelete;
  }

  /**
   * Function to return the name of a supplier
   *
   * @param id - ID of the supplier
   */
  getSupplierName(id: number): string {
    let tempSupplier: Supplier;

    if (this.suppliers.length > 0) {
      tempSupplier = this.suppliers.find(supplier => supplier.id === id);
    }

    return tempSupplier ? tempSupplier.name : '';
  }

  /**
   * Function to filter products list based on filter input
   *
   * @param text - text to filter products with
   */
  filterProducts(text: string): Product[] {
    return this.productsData.filter(product => {
      const term = text.toLowerCase();
      return product.name.toLowerCase().includes(term)
        || product.code.toLowerCase().includes(term)
        || product.category.toLowerCase().includes(term)
        || product.name.toLowerCase().includes(term)
        || this.getSupplierName(product.supplierId).toLowerCase().includes(term);
    });
  }
}
