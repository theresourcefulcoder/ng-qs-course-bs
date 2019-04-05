import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });
});
