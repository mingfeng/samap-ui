import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { TravelMode } from '../enums';
import { SettingService } from '../storage.service';
import { BASEMAPS, DEFAULT_BASEMAP } from '../constants';
import { MapService } from '../map.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  travelTimeControl = new FormControl(10, [
    Validators.required,
    Validators.min(10),
    Validators.max(120)
  ]);

  basemaps = Object.entries(BASEMAPS);
  currentBasemap = DEFAULT_BASEMAP;
  currentTravelMode = TravelMode.CAR;
  currentTravelTime = 10;
  currentColor = '#3388FF';

  constructor(
    private storageService: SettingService,
    private mapService: MapService
  ) {
    this.travelTimeControl.valueChanges.subscribe(value => this.updateSettings());
    this.travelTimeControl.setValue(this.storageService.travelTime);
    this.currentBasemap = this.storageService.basemap;
    this.currentTravelMode = this.storageService.travelMode;
  }

  changeBasemap(basemap: string) {
    this.currentBasemap = basemap;
    this.mapService.activateBasemap(basemap);
    this.updateSettings();
  }

  changeTravelMode(mode: TravelMode) {
    this.currentTravelMode = mode;
    this.updateSettings();
  }

  changeColor(color: string) {
    this.currentColor = color;
  }

  updateSettings() {

  }
}
