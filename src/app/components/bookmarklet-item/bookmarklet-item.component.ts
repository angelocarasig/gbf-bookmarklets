import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Bookmark } from 'src/app/models/bookmark.model';
import { BookmarkService } from 'src/app/services/bookmark/bookmark.service';

@Component({
  selector: 'app-bookmarklet-item',
  templateUrl: './bookmarklet-item.component.html',
  styleUrls: ['./bookmarklet-item.component.scss'],
})
export class BookmarkletItemComponent implements OnInit {
  @Input() bookmark: any;
  @Output() sendUpdatedBookmark = new EventEmitter<any>();
  prevBookmark: any;
  
  globalOptions!: Bookmark;
  bookmarkParams!: FormGroup;

  editMode!: boolean;
  submitted!: boolean;
  isValidColorBool!: boolean;
  units!: String[];
  opacity!: number;
  // Above is local opacity, but is identical in value to the formBuilder opacity
  // Only used to have two-way binding between the input and slider

  isRightClicked!: boolean;
  
  constructor(private bookmarkService: BookmarkService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.globalOptions = new Bookmark({...this.bookmarkService.getGlobalProperties()});
    this.bookmarkParams = this.formBuilder.group({
      name: [this.bookmark.name, Validators.required],
      url: [this.bookmark.url, Validators.required],
      background: [this.bookmark.background, Validators.required],
      opacity: [this.bookmark.opacity, Validators.required],
      height: [this.bookmark.height, Validators.required],
      width: [this.bookmark.width, Validators.required],
      units: [this.bookmark.units],
      positionoffset: [this.bookmark.positionoffset, Validators.required],
      color: [this.bookmark.color], // Not required for this as it can default to plain white
    });

    this.prevBookmark = new Bookmark({...this.bookmark});

    this.editMode = false;
    this.submitted = false;
    this.isValidColorBool = true;
    this.units = ['px', 'rem'];
    this.opacity = 100;

    this.isRightClicked = false;

    this.initSubscriptionObservers();
  }

  initSubscriptionObservers(): void {
    this.bookmarkParams.valueChanges.subscribe(() => {
      this.updateBookmark();
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.bookmarkParams.markAllAsTouched();
    this.isValidColor();

    if (!this.validateUrl(this.bookmark.url)) {
      console.error("Something went wrong with the provided URL. Could not be updated.");
      return;
    }

    const bookmarkControls = this.bookmarkParams.controls;
    let isFormValid = true;

    Object.keys(bookmarkControls).forEach(controlName => {
      if (!bookmarkControls[controlName].valid) {
        isFormValid = false;
      }
    });

    if (isFormValid && this.isValidColorBool) {
      this.prevBookmark = this.bookmark;

      this.bookmark.isEmpty = false;

      this.sendUpdatedBookmark.emit(this.bookmark);
      this.toggleEditMode();
    }
  }
  
  revertChanges(): void {
    this.bookmark = {...this.bookmark, ...this.prevBookmark};
    this.toggleEditMode();
  }

  updateBookmark(): void {
    this.bookmark.name = this.bookmarkParams.get('name')?.value;
    this.bookmark.url = this.bookmarkParams.get('url')?.value;
    this.bookmark.background = this.bookmarkParams.get('background')?.value;
    this.bookmark.opacity = this.bookmarkParams.get('opacity')?.value;
    this.bookmark.height = this.bookmarkParams.get('height')?.value;
    this.bookmark.width = this.bookmarkParams.get('width')?.value;
    this.bookmark.units = this.bookmarkParams.get('units')?.value;
    this.bookmark.positionoffset = this.bookmarkParams.get('positionoffset')?.value;
    this.bookmark.color = this.bookmarkParams.get('color')?.value;
  }

  resetBookmark(): void {
    const { id, index, position } = this.bookmark;
    this.bookmark = new Bookmark({
        ...this.bookmarkService.getGlobalProperties(),
        id,
        index,
        position,
    });
    this.sendUpdatedBookmark.emit(this.bookmark);
    this.toggleEditMode();
  }

  validateUrl(input: string): boolean {
    try {
      const wrappedCode = `\`${input.replace(/`/g, '\\`')}\``;
      const func = new Function(wrappedCode);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  getBackgroundColor(): string {
    return this.bookmark.background;
  }

  getUnits(): string {
    return `${this.bookmark.units}`;
  }

  getOpacity(): string {
    return `${this.bookmark.opacity}%`;
  }

  getWidth(): string {
    return `${this.bookmark.width}${this.getUnits()}`;
  }

  getHeight(): string {
    return `${this.bookmark.height}${this.getUnits()}`;
  }

  getSpacing(): string {
    return `${this.bookmark.index * this.bookmark.spacing}${this.getUnits()}`;
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }
  
  getPosition(): string {
    return this.bookmark.position;
  }

  getPositionOffset(): any {
    const returnVal = `${this.bookmark.positionoffset}${this.getUnits()}`;
    switch (this.getPosition()) {
      case 'left':
        return {'left': returnVal};
      case 'right':
        return {'right': returnVal};
      default:
        console.error('Invalid Position');
    }
  }

  isValidColor(): void {
    const hexRegex = /^#?([0-9a-fA-F]{3}){1,2}$/
    const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
    const rgbaRegex = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0(\.\d+)?|1(\.0+)?)\)$/;
    const hslaRegex = /^hsla?\(\s*(\d+(\.\d+)?|(\.\d+))\s*,\s*(\d+(\.\d+)?|(\.\d+))%\s*,\s*(\d+(\.\d+)?|(\.\d+))%(\s*,\s*(0(\.\d+)?|1(\.0+)?))?\s*\)$/

    const currentBackgroundColor = this.bookmarkParams.get('background')?.value;

    this.isValidColorBool = hexRegex.test(currentBackgroundColor) || rgbRegex.test(currentBackgroundColor) || rgbaRegex.test(currentBackgroundColor) || hslaRegex.test(currentBackgroundColor);
 }

  handleMouseDown(event: MouseEvent): void {
    if (event.button === 2) {
      event.preventDefault();
      this.isRightClicked = !this.isRightClicked;
      console.log("Right clicked!");
    }
  }

  handleAuxClick(event: MouseEvent): void {
    if (event.button === 1) {
      event.preventDefault();
      window.open(this.bookmark.url, '_blank');
    }
  }
}
