
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MAX_BOOKMARKS } from 'src/app/constants';
import { Bookmark } from 'src/app/models/bookmark.model';
import { BookmarkVisibilityService } from 'src/app/services/bookmark-visibility/bookmark-visibility.service';
import { BookmarkService } from 'src/app/services/bookmark/bookmark.service';
import { ResetService } from 'src/app/services/reset/reset.service';

@Component({
  selector: 'app-bookmarklet-container',
  templateUrl: './bookmarklet-container.component.html',
  styleUrls: ['./bookmarklet-container.component.scss']
})
export class BookmarkletContainerComponent implements OnInit {
  bookmarks!: Array<Bookmark>;
  globalOptions!: Bookmark;
  bookmarksVisible$ = this.bookmarkVisibilityService.visible$;
  resetSubscription!: Subscription;
  private localStorageKey = 'bookmarks';

  constructor(private bookmarkService: BookmarkService, private bookmarkVisibilityService: BookmarkVisibilityService, private resetService: ResetService) {};

  ngOnInit(): void {
    this.resetBookmarks();
    
    // Subscribe so reset whenever it's triggered
    this.resetSubscription = this.resetService.resetTriggered$.subscribe(() => {
      this.resetBookmarks();
    });

    // Subscribe to global property changes in here otherwise there'll be a LOT more reloads
    this.bookmarkService.getGlobalPropertiesAsObservable().subscribe(() => {
      const globalProperties = this.bookmarkService.getGlobalProperties();
      this.globalOptions = {...globalProperties};
      this.bookmarks.forEach((bookmark, index) => {
        this.bookmarks[index] = {
          ...bookmark,
          height: globalProperties.height,
          width: globalProperties.width,
          spacing: globalProperties.spacing,
          topoffset: globalProperties.topoffset,
          units: globalProperties.units,
        };
      })
    this.saveBookmarks();
    });
  }

  getTopSpacing(): string {
    return `${this.globalOptions.topoffset}${this.globalOptions.units}`;
  }

  onBookmarkUpdated(updatedBookmark: Bookmark): void {
    const index = this.bookmarks.findIndex((bookmark) => bookmark.id === updatedBookmark.id);
    this.bookmarks[index] = updatedBookmark;
    this.saveBookmarks();
  }

  // Load from local storage attempt
  // loadBookmarks(): boolean {
  //   const storedBookmarks = localStorage.getItem(this.localStorageKey);
  //   if (storedBookmarks != null) {
  //     this.bookmarks = JSON.parse(storedBookmarks);
  //     this.bookmarkService.setBookmarks(this.bookmarks);
  //     return true;
  //   }
  //   return false;
  // }

  resetBookmarks(): void {
    this.bookmarks = new Array<Bookmark>;
    this.globalOptions = new Bookmark({...this.bookmarkService.getGlobalProperties()});
    
    for (let i = 0; i < MAX_BOOKMARKS; i++) {
      const leftBookmark: Bookmark = {
        ...new Bookmark(),
        ...this.globalOptions,
        id: i * 2,
        index: i,
        position: 'left'
      };
      this.bookmarks.push(leftBookmark);
  
      const rightBookmark: Bookmark = {
        ...new Bookmark(),
        ...this.globalOptions,
        id: i * 2 + 1,
        index: i,
        position: 'right'
      };
      this.bookmarks.push(rightBookmark);
    }
  
    this.saveBookmarks();
  }

  private saveBookmarks(): void {
    // TODO: Add save to local storage here
    this.bookmarkService.setBookmarks(this.bookmarks);
  }
}
