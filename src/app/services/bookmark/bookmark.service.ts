import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { INIT_BOOKMARK_GLOBAL_PROPERTIES } from 'src/app/constants';
import { Bookmark } from 'src/app/models/bookmark.model';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private globalBookmarkOptionsSubject = new BehaviorSubject<Bookmark>(new Bookmark({...INIT_BOOKMARK_GLOBAL_PROPERTIES}));
  public globalBookmarkOptions$ = this.globalBookmarkOptionsSubject.asObservable();

  private bookmarksSubject = new BehaviorSubject<Bookmark[]>([]);
  public bookmarks$ = this.bookmarksSubject.asObservable();

  /**
   * Updates the global bookmark options with new values.
   * @param options - New bookmark options.
   */
  setGlobalProperties(options: Bookmark): void {
    this.globalBookmarkOptionsSubject.next(options);
  }

  /**
   * Returns the current global bookmark options.
   * @returns The current global bookmark options.
   */
  getGlobalProperties(): Bookmark {
    return this.globalBookmarkOptionsSubject.getValue();
  }

  /**
   * Returns an observable of the current global bookmark options.
   * @returns Observable of the current global bookmark options.
   */
  getGlobalPropertiesAsObservable(): Observable<Bookmark> {
    return this.globalBookmarkOptionsSubject.asObservable();
  }

  /**
   * Updates the bookmarks array with new bookmarks.
   * @param updatedBookmarks - New array of bookmarks.
   */
  setBookmarks(updatedBookmarks: Bookmark[]): void {
    this.bookmarksSubject.next(updatedBookmarks);
    console.log("Current bookmarks:");
    console.table(updatedBookmarks);
  }

  /**
   * Returns the current array of bookmarks.
   * @returns The current array of bookmarks.
   */
  getBookmarks(): Bookmark[] {
    return this.bookmarksSubject.getValue();
  }
}
