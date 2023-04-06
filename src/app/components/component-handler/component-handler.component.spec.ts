import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentHandlerComponent } from './component-handler.component';

describe('ComponentHandlerComponent', () => {
  let component: ComponentHandlerComponent;
  let fixture: ComponentFixture<ComponentHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentHandlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
