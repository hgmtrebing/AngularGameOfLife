import { TestBed } from '@angular/core/testing';

import { CellColorService } from './cell-color.service';

describe('CellColorService', () => {
  let service: CellColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CellColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
