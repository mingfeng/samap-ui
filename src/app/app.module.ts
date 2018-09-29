import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSidenavModule,
  MatListModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDialogModule,
} from '@angular/material';
import { MccColorPickerModule } from 'material-community-components';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { SettingsComponent } from './settings/settings.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    SettingsComponent,
    NavComponent,
    AboutComponent
  ],
  entryComponents: [
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatButtonToggleModule,
    MatCardModule,
    MccColorPickerModule,
    MatDialogModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
