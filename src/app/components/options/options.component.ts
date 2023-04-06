import { Component, OnInit } from '@angular/core';
import { GameZoomService } from 'src/app/services/game-zoom/game-zoom.service';
import { BookmarkService } from 'src/app/services/bookmark/bookmark.service';
import { Bookmark } from 'src/app/models/bookmark.model';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  gameZoomIconPath: string = './assets/diamond.png';
  gameZoom!: number;
  options!: Bookmark;
  units!: Array<string>;

  constructor(private gameZoomService: GameZoomService, private bookmarkService: BookmarkService) {};

  ngOnInit(): void {
    this.gameZoom = 0;
    this.options = this.bookmarkService.getGlobalProperties();
    this.units = ['px', 'rem'];
  }

  updateGlobalOptions(): void {
    this.bookmarkService.setGlobalProperties(this.options);
  }

  changeGameSize(): void {
    switch(this.gameZoom) {
      case 1:
        this.gameZoom = 1;
        break;
      case 2:
        this.gameZoom = 1.5;
        break;
      case 3:
        this.gameZoom = 2;
        break;
    }
    this.gameZoomService.updateGameZoom(this.gameZoom);
  }
}
