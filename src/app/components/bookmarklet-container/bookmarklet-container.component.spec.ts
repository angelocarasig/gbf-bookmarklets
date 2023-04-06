import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkletContainerComponent } from './bookmarklet-container.component';

describe('BookmarkletContainerComponent', () => {
  let component: BookmarkletContainerComponent;
  let fixture: ComponentFixture<BookmarkletContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkletContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkletContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
