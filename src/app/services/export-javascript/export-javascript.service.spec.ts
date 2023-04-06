import { TestBed } from '@angular/core/testing';

import { ExportJavascriptService } from './export-javascript.service';

describe('ExportJavascriptService', () => {
  let service: ExportJavascriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportJavascriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
