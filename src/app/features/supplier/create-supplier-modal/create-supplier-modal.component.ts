import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { HttpService } from 'src/app/shared/services/http.service';
import { Supplier } from '../supplier.model';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Country } from 'src/app/shared/models/country.model';
import { State } from 'src/app/shared/models/state.model';

@Component({
  selector: 'app-create-supplier-modal',
  templateUrl: './create-supplier-modal.component.html',
  styleUrls: ['./create-supplier-modal.component.css']
})
export class CreateSupplierModalComponent implements OnInit, OnDestroy {
  /**
   * Locally scoped variables
   */
  form: FormGroup;
  httpSub: Subscription;
  countries: Country[] = [];
  countriesSub: Subscription;
  states: State[] = [];
  statesSub: Subscription;
  filteredStates: State[] = [];

  /**
   * Constructor which injects services
   */
  constructor(public activeModal: NgbActiveModal,
              private alertService: AlertService,
              private formBuilder: FormBuilder,
              private httpService: HttpService) { }

  /**
   * OnInit lifecycle hook
   */
  ngOnInit(): void {
    // Fetch the countries for the dropdown
    this.countriesSub = this.httpService.read(environment.serverApiPath + 'countries')
      .subscribe(
        data => {
          this.countries = data;
        },
        error => {
          this.countries = [];
          this.alertService.error(`An error occurred fetching the countries. ${error.status} ${error.statusText} - ${error.url}`, false);
        }
      );

    // Fetch the states for the dropdown
    this.statesSub = this.httpService.read(environment.serverApiPath + 'states')
      .subscribe(
        data => {
          this.states = data;
          this.filteredStates = data;
        },
        error => {
          this.countries = [];
          this.alertService.error(`An error occurred fetching the states. ${error.status} ${error.statusText} - ${error.url}`, false);
        }
      );

    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.compose([Validators.required])],
      address1: ['', Validators.compose([Validators.required])],
      address2: [''],
      city: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      zipCode: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      contactName: ['', Validators.compose([Validators.required])],
      contactPhoneNumber: ['', Validators.compose([Validators.required,
                                                   Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)])],
      contactEmail: ['', Validators.compose([Validators.required, Validators.email])],
      active: [false],
    });
  }

  /**
   * OnDestroy lifecycle hook
   */
  ngOnDestroy(): void {
    if (this.httpSub) {
      this.httpSub.unsubscribe();
    }

    this.countriesSub.unsubscribe();
    this.statesSub.unsubscribe();
  }

  // Convenience form getters
  get id() { return this.form.get('id'); }
  get name() { return this.form.get('name'); }
  get address1() { return this.form.get('address1'); }
  get address2() { return this.form.get('address2'); }
  get city() { return this.form.get('city'); }
  get state() { return this.form.get('state'); }
  get zipCode() { return this.form.get('zipCode'); }
  get country() { return this.form.get('country'); }
  get contactName() { return this.form.get('contactName'); }
  get contactPhoneNumber() { return this.form.get('contactPhoneNumber'); }
  get contactEmail() { return this.form.get('contactEmail'); }
  get active() { return this.form.get('active'); }

  /**
   * Function to create a supplier
   *
   * @param supplier - supplier to create
   */
  createSupplier(supplier: Supplier): void {
    this.httpSub = this.httpService.create(environment.serverApiPath + 'suppliers', supplier)
      .subscribe(
        data => {
          this.activeModal.close(data);
        },
        error => {
          this.activeModal.close();
          this.alertService.error(`An error occurred creating the supplier. ${error.status} ${error.statusText} - ${error.url}`, false);
        }
      );
  }

  /**
   * Function to handle form submittal
   *
   * @param form - form values to process
   */
  submitForm(form: Supplier): void {
     this.createSupplier(form);
  }

  /**
   * Function to check the validity of a form field
   *
   * @param field - field being checked
   */
  isInvalid(field: any): boolean {
    console.log('isInvalid');
    return field.invalid && (field.dirty || field.touched);
  }

  /**
   * Function to filter states using the selected country
   *
   * @param countryId - country to filter states by
   */
  filterStates(countryId: string): void {
    this.filteredStates = this.states.filter(state => state.countryId.toString() === countryId);
  }
}
