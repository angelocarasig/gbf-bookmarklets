import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bookmark } from 'src/app/models/bookmark.model';

@Injectable({
  providedIn: 'root',
})
export class BookmarkLoadService {
  private _bookmarksToLoad$ = new BehaviorSubject<Bookmark[] | null>(null);

  get bookmarksToLoad$() {
    return this._bookmarksToLoad$.getValue();
  }

  loadBookmarks(bookmarks: Bookmark[]): void {
    this._bookmarksToLoad$.next(bookmarks);
  }
}
