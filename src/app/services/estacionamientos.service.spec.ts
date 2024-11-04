import { TestBed } from '@angular/core/testing';

import { EstacionamientosService } from './estacionamientos.service';

describe('EstacionamientosService', () => {
  let service: EstacionamientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstacionamientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
