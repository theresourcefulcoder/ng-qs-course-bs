import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DeleteSupplierModalComponent } from './delete-supplier-modal.component';

describe('DeleteSupplierModalComponent', () => {
  let component: DeleteSupplierModalComponent;
  let fixture: ComponentFixture<DeleteSupplierModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DeleteSupplierModalComponent
      ],
      imports: [
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
    fixture = TestBed.createComponent(DeleteSupplierModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
