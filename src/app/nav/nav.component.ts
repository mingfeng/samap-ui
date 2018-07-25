import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { TravelMode } from '../enums';

const WALK_SPEED_KPH = 5;
const BIKE_SPEED_KPH = 15;
const CAR_SPEED_KPH = 40;
const SPEED_MAPPING = {
  [TravelMode.CAR]: CAR_SPEED_KPH,
  [TravelMode.BIKE]: BIKE_SPEED_KPH,
  [TravelMode.WALK]: WALK_SPEED_KPH
};

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  travelTimeControl = new FormControl('', [
    Validators.required,
    Validators.min(10),
    Validators.max(120)
  ]);

  currentTravelMode = TravelMode.CAR;

  constructor() {}

  get travelSpeed() {
    return SPEED_MAPPING[this.currentTravelMode];
  }

  changeTravelMode(mode: TravelMode) {
    this.currentTravelMode = mode;
  }
}
