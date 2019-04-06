import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      imports: [
        FontAwesomeModule,
        NgbModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
