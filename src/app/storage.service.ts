import { Injectable } from '@angular/core';

import { Settings } from './interfaces/settings';

export const DEFAULT_DISTANCE = 1000;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _settings: Settings;

  constructor() { }

  get settings(): Settings {
    if (!this._settings) {
      this._settings = {
        distance: parseInt(localStorage.getItem('settings-distance'), 10) || DEFAULT_DISTANCE
      };
    }

    return this._settings;
  }

  set settings(settings: Settings) {
    this._settings = settings;
    localStorage.setItem('settings-distance', settings.distance.toString());
  }
}
