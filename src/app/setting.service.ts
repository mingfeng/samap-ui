import { Injectable } from '@angular/core';

import { TravelMode } from './enums';
import { DEFAULT_BASEMAP } from './constants';

export const DEFAULT_TRAVEL_MODE = TravelMode.CAR;
export const DEFAULT_TRAVEL_TIME = 10;

const WALK_SPEED_KPH = 5;
const BIKE_SPEED_KPH = 15;
const CAR_SPEED_KPH = 40;
const SPEED_MAPPING = {
  [TravelMode.CAR]: CAR_SPEED_KPH,
  [TravelMode.BIKE]: BIKE_SPEED_KPH,
  [TravelMode.WALK]: WALK_SPEED_KPH
};
const DEFAULT_SERVICE_AREA_COLOR = '#3388FF';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  basemap = DEFAULT_BASEMAP;
  travelMode = DEFAULT_TRAVEL_MODE;
  travelTime = DEFAULT_TRAVEL_TIME;
  serviceAreaColor = DEFAULT_SERVICE_AREA_COLOR;

  constructor() { }

  get travelDistance(): number {
    const travelSpeed = SPEED_MAPPING[this.travelMode] * 1000 / 3600;
    const travelTimeInSeconds = this.travelTime * 60;
    return Math.round(travelSpeed * travelTimeInSeconds);
  }
}
