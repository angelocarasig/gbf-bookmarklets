// Angular Stuff
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Components / Routing
import { AppComponent } from './app.component';
import { BookmarkletContainerComponent } from './components/bookmarklet-container/bookmarklet-container.component';
import { BookmarkletItemComponent } from './components/bookmarklet-item/bookmarklet-item.component';
import { BookmarkletLoaderComponent } from './components/bookmarklet-loader/bookmarklet-loader.component';
import { ComponentHandlerComponent } from './components/component-handler/component-handler.component';
import { GameWindowComponent } from './components/game-window/game-window.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { OptionsComponent } from './components/options/options.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

// Other library imports
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { SplitterModule } from 'primeng/splitter';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';

// API Stuff
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    BookmarkletContainerComponent,
    BookmarkletItemComponent,
    BookmarkletLoaderComponent,
    ComponentHandlerComponent,
    GameWindowComponent,
    MainContainerComponent,
    OptionsComponent,
    ToolbarComponent,
  ],
  imports: [
    AccordionModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    CheckboxModule,
    ColorPickerModule,
    ConfirmDialogModule,
    CommonModule,
    DialogModule,
    DividerModule,
    DragDropModule,
    FormsModule,
    InputNumberModule,
    InputMaskModule,
    InputTextModule,
    KeyFilterModule,
    PanelModule,
    RadioButtonModule,
    RatingModule,
    ReactiveFormsModule,
    SelectButtonModule,
    SliderModule,
    SplitterModule,
    TabViewModule,
    ToolbarModule,
    TooltipModule,
    ToastModule,
    TreeModule,
    SidebarModule,
    ScrollPanelModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
