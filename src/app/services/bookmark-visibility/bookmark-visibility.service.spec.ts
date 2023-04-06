import { TestBed } from '@angular/core/testing';

import { BookmarkVisibilityService } from './bookmark-visibility.service';

describe('ToolbarVisibilityService', () => {
  let service: BookmarkVisibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmarkVisibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
