import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { TravelMode } from '../enums';
import { SettingService } from '../setting.service';
import { BASEMAPS } from '../constants';
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

  constructor(
    private settingService: SettingService,
    private mapService: MapService
  ) {
    this.travelTimeControl.valueChanges.subscribe(travelTime => this.travelTime = travelTime);
    this.travelTimeControl.setValue(this.travelTime);
  }

  get basemap(): string {
    return this.settingService.basemap;
  }

  set basemap(basemap: string) {
    this.settingService.basemap = basemap;
    this.mapService.activateBasemap(basemap);
  }

  get travelMode(): TravelMode {
    return this.settingService.travelMode;
  }

  set travelMode(mode: TravelMode) {
    this.settingService.travelMode = mode;
  }

  get travelTime(): number {
    return this.settingService.travelTime;
  }

  set travelTime(time: number) {
    this.settingService.travelTime = time;
  }

  get serviceAreaColor(): string {
    return this.settingService.serviceAreaColor;
  }

  set serviceAreaColor(color: string) {
    this.settingService.serviceAreaColor = color;
  }

  changeBasemap(basemap: string) {
    this.basemap = basemap;
  }

  changeTravelMode(mode: TravelMode) {
    this.travelMode = mode;
  }

  changeServiceAreaColor(color: string) {
    this.serviceAreaColor = color;
  }
}
