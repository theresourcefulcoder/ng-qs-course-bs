import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { AlertComponent } from './core/alert/alert.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        NgbModule,
        RouterTestingModule
      ],
      declarations: [
        AlertComponent,
        AppComponent,
        HeaderComponent,
        FooterComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
