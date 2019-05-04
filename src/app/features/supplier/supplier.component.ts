import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { faPlus, faPencilAlt, faTrashAlt, IconDefinition, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Supplier } from './supplier.model';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { CreateSupplierModalComponent } from './create-supplier-modal/create-supplier-modal.component';
import { ViewSupplierModalComponent } from './view-supplier-modal/view-supplier-modal.component';
import { UpdateSupplierModalComponent } from './update-supplier-modal/update-supplier-modal.component';
import { DeleteSupplierModalComponent } from './delete-supplier-modal/delete-supplier-modal.component';
import { State } from 'src/app/shared/models/state.model';
import { AlertService } from 'src/app/shared/services/alert.service';

/**
 * Component that manages suppliers
 */
@Component({
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit, OnDestroy {
  /**
   * Locally scoped variables
   */
  states: State[] = [];
  statesSub: Subscription;
  suppliersSub: Subscription;
  supplierData: Supplier[] = [];
  supplierTotal = 0;
  page = 1;
  pageSize = 5;

  /**
   * Font Awesome Icons
   */
  faPlus: IconDefinition = faPlus;
  faInfo: IconDefinition = faInfoCircle;
  faPencil: IconDefinition = faPencilAlt;
  faTrash: IconDefinition = faTrashAlt;

  /**
   * Constructor
   */
  constructor(private alertService: AlertService,
              private httpService: HttpService,
              private modal: NgbModal) { }

  /**
   * OnInit Lifecycle Hook
   */
  ngOnInit(): void {
    // Fetch all the suppliers, client side paging will be used
    this.suppliersSub = this.httpService.read(environment.serverApiPath + 'suppliers')
      .subscribe(
        data => {
          this.supplierData = data;
          this.supplierTotal = data.length;
        },
        error => {
          this.alertService.error(`An error occurred fetching the suppliers. ${error.status} ${error.statusText} - ${error.url}`, false);
        }
      );

    // Fetch the states to be used later to lookup the abbreviations
    this.statesSub = this.httpService.read(environment.serverApiPath + 'states')
      .subscribe(
        data => {
          this.states = data;
        },
        error => {
          this.alertService.error(`An error occurred fetching the states. ${error.status} ${error.statusText} - ${error.url}`, false);
        }
      );
  }

  /**
   * OnDestroy Lifecycle Hook
   */
  ngOnDestroy(): void {
    this.suppliersSub.unsubscribe();
    this.statesSub.unsubscribe();
  }

  /**
   * Get function which will apply paging to the data
   */
  get suppliers(): Supplier[] {
    return this.supplierData
      .map((supplier, i) => ({id: i + 1, ...supplier}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  /**
   * Function to create new suppliers
   */
  createNewSupplier(): void {
    // Open the modal
    const modalRef = this.modal.open(CreateSupplierModalComponent, { size: 'lg' });

    // Process the results of the modal
    modalRef.result.then(result => {
      if (result) {
        // Add the new supplier
        this.supplierData = [...this.supplierData, result];
        // Update the supplier total
        this.supplierTotal = this.supplierData.length;
      }
    });
  }

  /**
   * Function to view suppliers
   *
   * @param supplier - the supplier to view
   */
  viewSupplier(supplier: Supplier): void {
    // Open the modal
    const modalRef = this.modal.open(ViewSupplierModalComponent, { size: 'lg' });

    // Pass data to the modal
    modalRef.componentInstance.supplier = supplier;
  }

  /**
   * Function to update suppliers
   *
   * @param supplierToUpdate - the supplier to update
   */
  updateSupplier(supplierToUpdate: Supplier): void {
    // Open the modal
    const modalRef = this.modal.open(UpdateSupplierModalComponent, { size: 'lg' });

    // Process the results of the modal
    modalRef.result.then(result => {
      if (result) {
        // Update the supplier
        this.supplierData.map(supplier => {
          if (supplier.id === result.id) {
            // Merge the updated values
            Object.assign(supplier, result);
          }
        });
      }
    });

    // Pass data to the modal
    modalRef.componentInstance.supplier = supplierToUpdate;
  }

  /**
   * Function to delete suppliers
   *
   * @param supplierToDelete - the supplier to delete
   */
  deleteSupplier(supplierToDelete: Supplier): void {
    // Open the modal
    const modalRef = this.modal.open(DeleteSupplierModalComponent, { size: 'lg' });

    // Process the results of the modal
    modalRef.result.then(result => {
      if (result && result.id) {
        // Remove the deleted supplier
        this.supplierData = this.supplierData.filter(supplier => supplier.id !== result.id);
        // Update the supplier total
        this.supplierTotal = this.supplierData.length;
      }
    });

    // Pass data to the modal
    modalRef.componentInstance.supplier = supplierToDelete;
  }

  /**
   * Function to return the abbreviation for the state
   *
   * @param id - ID of the state
   */
  getStateAbbreviation(id: number): string {
    let tempState: State;

    if (this.states.length > 0) {
      tempState = this.states.find(state => state.id === id);
    }

    return tempState ? tempState.abbreviation : '';
  }
}
