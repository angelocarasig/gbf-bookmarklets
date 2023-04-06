import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarVisibilityService {
  private visibleSubject = new BehaviorSubject<boolean>(true);

  get visible$() {
    return this.visibleSubject.asObservable();
  }

  setVisible(visible: boolean) {
    this.visibleSubject.next(visible);
  }
}
