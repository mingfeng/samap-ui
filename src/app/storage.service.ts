import { Injectable } from '@angular/core';

import { Settings } from './interfaces/settings';
import { TravelMode } from './enums';

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

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _settings: Settings;

  constructor() { }

  get settings(): Settings {
    if (!this._settings) {
      this._settings = {
        travelMode: <TravelMode>sessionStorage.getItem('settings-travelMode') || DEFAULT_TRAVEL_MODE,
        travelTime: parseInt(sessionStorage.getItem('settings-travelTime'), 10) || DEFAULT_TRAVEL_TIME
      };
    }
    return this._settings;
  }

  set settings(settings: Settings) {
    this._settings = settings;
    sessionStorage.setItem('settings-travelMode', settings.travelMode);
    sessionStorage.setItem('settings-travelTime', settings.travelTime.toString());
  }

  get travelSpeed(): number {
    return SPEED_MAPPING[this.settings.travelMode] * 1000 / 3600;
  }

  get travelTime(): number {
    return this.settings.travelTime * 60;
  }

  get travelDistance(): number {
    return Math.round(this.travelSpeed * this.travelTime);
  }
}
