import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { TravelMode } from '../enums';
import { StorageService } from '../storage.service';
import { Settings } from '../interfaces/settings';

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

  currentTravelMode = TravelMode.CAR;

  constructor(private storageService: StorageService) {}

  changeTravelMode(mode: TravelMode) {
    this.currentTravelMode = mode;
  }

  updateSettings() {
    const settings: Settings = {
      travelMode: this.currentTravelMode,
      travelTime: this.travelTimeControl.value
    };
    this.storageService.settings = settings;
  }
}
