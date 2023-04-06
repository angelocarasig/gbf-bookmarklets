import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameZoomService {
  private gameZoomSubject = new BehaviorSubject<number>(2);

  get gameZoom$() {
    return this.gameZoomSubject.asObservable();
  }

  updateGameZoom(value: number) {
    this.gameZoomSubject.next(value);
  }
}
