import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UpdateSupplierModalComponent } from './update-supplier-modal.component';

describe('UpdateSupplierModalComponent', () => {
  let component: UpdateSupplierModalComponent;
  let fixture: ComponentFixture<UpdateSupplierModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UpdateSupplierModalComponent
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        NgbActiveModal
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSupplierModalComponent);
    component = fixture.componentInstance;

    component.supplier = {
      id: 7,
      name: 'Desert Plains Products',
      address1: '15687 US Hwy 31',
      address2: '',
      city: 'Scottsdale',
      state: 17,
      zipCode: '85252',
      country: 2,
      contactName: 'Martin Taylor',
      contactPhoneNumber: '480-497-1683',
      contactEmail: 'martin@desertplainsproducts.com',
      active: true
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
