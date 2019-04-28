import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Supplier } from '../supplier.model';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-delete-supplier-modal',
  templateUrl: './delete-supplier-modal.component.html',
  styleUrls: ['./delete-supplier-modal.component.css']
})
export class DeleteSupplierModalComponent implements OnInit {
  /**
   * Input properties
   */
  @Input() supplier: Supplier;

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
   * Function to delete a supplier
   *
   * @param id - id of supplier to delete
   */
  deleteSupplier(id: number): void {
    this.httpService.delete(environment.serverApiPath + 'suppliers', id)
      .subscribe(
        data => {
          this.activeModal.close({id});
        },
        error => {
          this.activeModal.close();
          this.alertService.error(`An error occurred deleting the supplier. ${error.status} ${error.statusText} - ${error.url}`, false);
        }
      );
  }
}
