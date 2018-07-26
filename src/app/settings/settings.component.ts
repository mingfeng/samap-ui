import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { TravelMode } from '../enums';
import { StorageService } from '../storage.service';

const WALK_SPEED_KPH = 5;
const BIKE_SPEED_KPH = 15;
const CAR_SPEED_KPH = 40;
const SPEED_MAPPING = {
  [TravelMode.CAR]: CAR_SPEED_KPH,
  [TravelMode.BIKE]: BIKE_SPEED_KPH,
  [TravelMode.WALK]: WALK_SPEED_KPH
};

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

  constructor() {}

  get travelSpeed() {
    return SPEED_MAPPING[this.currentTravelMode] * 1000 / 3600;
  }

  get travelTime() {
    return this.travelTimeControl.valid ? this.travelTimeControl.value * 60 : 0;
  }

  get travelDistance() {
    return this.travelSpeed * this.travelTime;
  }

  changeTravelMode(mode: TravelMode) {
    this.currentTravelMode = mode;
  }
}
