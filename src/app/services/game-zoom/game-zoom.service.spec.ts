import { TestBed } from '@angular/core/testing';

import { GameZoomService } from './game-zoom.service';

describe('GameZoomServiceService', () => {
  let service: GameZoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameZoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
