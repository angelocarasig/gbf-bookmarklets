import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  constructor() { }

  private resetTriggered = new Subject<void>();

  resetTriggered$ = this.resetTriggered.asObservable();

  triggerFunctionCall() {
    this.resetTriggered.next();
  }
}
