import { TestBed } from '@angular/core/testing';

import { PlacaService } from './placa.service';

describe('PlacaService', () => {
  let service: PlacaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlacaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
