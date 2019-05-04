import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { noop } from 'rxjs';

import { Product } from '../product.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.css']
})
export class DeleteProductModalComponent implements OnInit {
  /**
   * Input properties
   */
  @Input() product: Product;

  /**
   * Constructor which injects services
   */
  constructor(public activeModal: NgbActiveModal,
              private alertService: AlertService,
              private httpService: HttpService) { }

  /**
   * OnInit lifecycle hook
   */
  ngOnInit(): void {
  }

  /**
   * Function to delete a product
   *
   * @param id - id of product to delete
   */
  deleteProduct(id: number): void {
    this.httpService.delete(environment.serverApiPath + 'products', id)
      .subscribe(
        noop,
        error => {
          this.alertService.error(`An error occurred deleting the product. ${error.status} ${error.statusText} - ${error.url}`, false);
          this.activeModal.close();
        },
        () => {
          this.alertService.success(`Product (${this.product.name}) was successfully deleted.`, true);
          this.activeModal.close({id});
        }
      );
  }
}
