import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarkVisibilityService {
  private visibleSubject = new BehaviorSubject<boolean>(true);

  get visible$() {
    return this.visibleSubject.asObservable();
  }

  setVisible(visible: boolean) {
    console.log(`Set visibility to ${visible}`);
    this.visibleSubject.next(visible);
  }
}
