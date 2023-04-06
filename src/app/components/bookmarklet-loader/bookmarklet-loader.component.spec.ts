import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkletLoaderComponent } from './bookmarklet-loader.component';

describe('BookmarkletLoaderComponent', () => {
  let component: BookmarkletLoaderComponent;
  let fixture: ComponentFixture<BookmarkletLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkletLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkletLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
