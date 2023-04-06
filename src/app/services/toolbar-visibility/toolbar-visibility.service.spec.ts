import { TestBed } from '@angular/core/testing';

import { ToolbarVisibilityService } from './toolbar-visibility.service';

describe('ToolbarVisibilityService', () => {
  let service: ToolbarVisibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolbarVisibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
