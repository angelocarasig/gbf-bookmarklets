
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Subscription, timeout } from 'rxjs';

import { MAX_BOOKMARKS } from 'src/app/constants';
import { Bookmark } from 'src/app/models/bookmark.model';
import { BookmarkVisibilityService } from 'src/app/services/bookmark-visibility/bookmark-visibility.service';
import { BookmarkService } from 'src/app/services/bookmark/bookmark.service';
import { BookmarkLoadService } from 'src/app/services/bookmark-load/bookmark-load.service';
import { ResetService } from 'src/app/services/reset/reset.service';

@Component({
  selector: 'app-bookmarklet-container',
  templateUrl: './bookmarklet-container.component.html',
  styleUrls: ['./bookmarklet-container.component.scss']
})
export class BookmarkletContainerComponent implements OnInit {  
  @Input() startFromScratch!: string; // Either 'new' or 'load'
  loadedOnce!: boolean;
  bookmarks!: Array<Bookmark>;
  globalOptions!: Bookmark;
  bookmarksVisible$ = this.bookmarkVisibilityService.visible$;
  resetSubscription!: Subscription;
  
  displayDialog: boolean = false;
  externalUrl: string = '';
  navigateConfirmed: boolean = false;

  navigateTo(url: string): void {
    this.externalUrl = url;
    this.displayDialog = true;
  }

  onConfirm(): void {
    this.navigateConfirmed = true;
    this.displayDialog = false;
    window.open(this.externalUrl, '_blank');
  }

  onCancel(): void {
    this.externalUrl = '';
    this.displayDialog = false;
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: BeforeUnloadEvent): void {
    if (!this.navigateConfirmed) {
      event.preventDefault();
      event.returnValue = '';
      this.displayDialog = true;
    }
  }

  constructor(private bookmarkService: BookmarkService, private bookmarkVisibilityService: BookmarkVisibilityService, private bookmarkLoadService: BookmarkLoadService, private resetService: ResetService) {};

  ngOnInit(): void {
    // If it hasn't been loaded in once, set to true and load the bookmarks in inside resetBookmarks
    this.loadedOnce = this.startFromScratch == null || this.startFromScratch === 'load';
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
  
    if (!this.loadedOnce) {
      const loadedBookmarks = this.bookmarkLoadService.bookmarksToLoad$;
      if (loadedBookmarks != null) {
        loadedBookmarks.forEach((loadedBookmark) => {
          const index = this.bookmarks.findIndex((bookmark) => bookmark.id === loadedBookmark.id);
          this.bookmarks[index] = loadedBookmark;
        })
      }
      this.loadedOnce = true;
    }

    this.saveBookmarks();
  }

  private saveBookmarks(): void {
    this.bookmarkService.setBookmarks(this.bookmarks);
  }
}
