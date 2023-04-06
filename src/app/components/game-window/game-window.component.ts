import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameZoomService } from 'src/app/services/game-zoom/game-zoom.service';
import { ToolbarVisibilityService } from 'src/app/services/toolbar-visibility/toolbar-visibility.service';

@Component({
  selector: 'app-game-window',
  templateUrl: './game-window.component.html',
  styleUrls: ['./game-window.component.scss']
})
export class GameWindowComponent {
  // Initialized in the gameZoomService to 2
  zoomLevel!: number;

  zoomSubscription: Subscription;
  toolbarVisible$ = this.toolbarVisibilityService.visible$;
  
  constructor(private gameZoomService: GameZoomService, private toolbarVisibilityService: ToolbarVisibilityService) {
    //Update on changes to zoom level
    this.zoomSubscription = this.gameZoomService.gameZoom$.subscribe(
      (value) => (this.zoomLevel = value)
    );
  }

  // Handler for when toolbar disappears
  toggleToolbarVisibility(): void {
    this.toolbarVisibilityService.setVisible(true);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  // Set background image to file
  onDrop(event: DragEvent, dropZoneIndex: number) {
    event.preventDefault();
    const files = event.dataTransfer!.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const dropZone = document.querySelectorAll('.drop-zone')[dropZoneIndex] as HTMLElement;
        const containerDropZone = document.querySelector('.container-drop-zone') as HTMLElement;
        if (containerDropZone != null && containerDropZone.contains(event.target as Node)) {
          return;
        }
        dropZone.style.backgroundImage = `url(${reader.result})`;
      };
    }
  }
}
