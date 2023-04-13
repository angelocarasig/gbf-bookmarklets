import { TestBed } from '@angular/core/testing';

import { BookmarkLoadService } from './bookmark-load.service';

describe('BookmarkLoadService', () => {
  let service: BookmarkLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmarkLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
