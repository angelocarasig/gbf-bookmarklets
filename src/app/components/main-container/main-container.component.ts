import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-main-container',
    templateUrl: './main-container.component.html',
    styleUrls: ['./main-container.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MainContainerComponent {
    @Output() startFromScratch = new EventEmitter<boolean>();

    loadBookmarklets(isNew: boolean): void {
        this.startFromScratch.emit(isNew);
    }
}
