import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-handler',
  templateUrl: './component-handler.component.html',
  styleUrls: ['./component-handler.component.scss']
})
export class ComponentHandlerComponent implements OnInit {
  currentComponent: string = 'startup';

  ngOnInit(): void {
    // TODO: Change back to 'startup' later
    this.currentComponent = 'new';
  }

  goHome(): void {
    this.currentComponent = 'startup';
  }

  startFromScratch(event: boolean): void {
    if (event) {
      this.currentComponent = 'new';
    }
    else {
      this.currentComponent = 'load';
    }
  }
}
