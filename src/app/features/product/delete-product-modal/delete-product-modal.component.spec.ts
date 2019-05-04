import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DeleteProductModalComponent } from './delete-product-modal.component';

describe('DeleteProductModalComponent', () => {
  let component: DeleteProductModalComponent;
  let fixture: ComponentFixture<DeleteProductModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProductModalComponent ],
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
    fixture = TestBed.createComponent(DeleteProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
