import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToolbarVisibilityService } from 'src/app/services/toolbar-visibility/toolbar-visibility.service';
import { BookmarkService } from 'src/app/services/bookmark/bookmark.service';
import { ExportJavascriptService } from 'src/app/services/export-javascript/export-javascript.service';
import { Bookmark } from 'src/app/models/bookmark.model';
import { BookmarkVisibilityService } from 'src/app/services/bookmark-visibility/bookmark-visibility.service';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { ResetService } from 'src/app/services/reset/reset.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() homeEmitter = new EventEmitter<void>();
  @Output() gameSizeEmitter = new EventEmitter<number>();

  dragHandle: string = './assets/draggable.png';
  showOptions!: boolean;
  toolbarVisible$: Observable<boolean> = this.toolbarVisibilityService.visible$;
  bookmarksVisible$: Observable<boolean> = this.bookmarkVisibilityService.visible$;
  currentBookmarkVisible = true;

  constructor(
    private bookmarkService: BookmarkService,
    private toolbarVisibilityService: ToolbarVisibilityService,
    private bookmarkVisibilityService: BookmarkVisibilityService,
    private exportJavascriptService: ExportJavascriptService,
    private confirmationService: ConfirmationService,
    private resetService: ResetService
  ) { }
  
  ngOnInit(): void {
    this.bookmarksVisible$.subscribe((value) => {
      this.currentBookmarkVisible = value;
    });

    this.showOptions = false;
  }

  // Toggle the visibility of the options
  toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }

  // Emit an event to go back to the home page
  goHome(): void {
    this.homeEmitter.emit();
  }

  // Toggle the visibility of the toolbar
  toggleToolbarVisibility(): void {
      this.toolbarVisibilityService.setVisible(!this.toolbarVisible$);
  }

  toggleBookmarksVisibility(): void {
    const newValue = !this.currentBookmarkVisible;
    this.bookmarkVisibilityService.setVisible(newValue);
  }

  // Generate and download a JavaScript file containing the bookmarks
  saveBookmarks(): void {
    const bookmarks: Array<Bookmark> = this.bookmarkService.getBookmarks();
    this.exportJavascriptService.generateJsFile(bookmarks);
  }

  showSaveConfirmation() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to save?',
        header: 'Confirmation',
        icon: 'pi pi-save',
        accept: () => {
          this.saveBookmarks();
        },
        reject: () => {
          return;
        }
    });
  }

  showHomeConfirmation() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to go home? Changes will not be saved.',
        header: 'Confirmation',
        accept: () => {
          this.goHome();
        },
        reject: () => {
          return;
        }
    });
  }

  resetBookmarks(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to reset? Changes will not be saved.',
      header: 'Confirmation',
      accept: () => {
        this.resetService.triggerFunctionCall();
      },
      reject: () => {
        return;
      }
  });
  }
}
