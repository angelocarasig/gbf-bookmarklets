import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkletItemComponent } from './bookmarklet-item.component';

describe('BookmarkletItemComponent', () => {
  let component: BookmarkletItemComponent;
  let fixture: ComponentFixture<BookmarkletItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkletItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkletItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
