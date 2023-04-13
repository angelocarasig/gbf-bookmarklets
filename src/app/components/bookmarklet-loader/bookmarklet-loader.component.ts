import { Component, EventEmitter, Output } from '@angular/core';
import { VALIDATE_BOOKMARKS } from 'src/app/constants';
import { Bookmark } from 'src/app/models/bookmark.model';
import { BookmarkLoadService } from 'src/app/services/bookmark-load/bookmark-load.service';

@Component({
  selector: 'app-bookmarklet-loader',
  templateUrl: './bookmarklet-loader.component.html',
  styleUrls: ['./bookmarklet-loader.component.scss'],
})
export class BookmarkletLoaderComponent {
  @Output() homeEmitter = new EventEmitter<void>();
  @Output() startFromScratch = new EventEmitter<boolean>();

  constructor(private bookmarkLoadService: BookmarkLoadService) {}
  bookmarksArray!: Array<Bookmark>;
  bookmarks = '';
  //this.bookmarkLoadService.loadBookmarks(bookmarks);

  validateBookmarks(): void {
    const cleanInput = this.bookmarks != null ? this.bookmarks.replace(/const\s+bookmarks\s+=\s+/, '') : '';
    const arrayString = cleanInput.match(/\[(.*)\]/s)![0];
    const array = eval(arrayString);
    const bookmarks = array.map((item: any) => new Bookmark(item));
    this.bookmarkLoadService.loadBookmarks(bookmarks);
    this.startFromScratch.emit(true);
  }

  goHome(): void {
    this.homeEmitter.emit();
  }
}
