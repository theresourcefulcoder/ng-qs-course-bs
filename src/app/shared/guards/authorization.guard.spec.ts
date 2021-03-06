import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthorizationGuard } from './authorization.guard';
import { HttpClientModule } from '@angular/common/http';

describe('AuthorizationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizationGuard],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ]
    });
  });

  it('should ...', inject([AuthorizationGuard], (guard: AuthorizationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
