import { Injectable } from '@angular/core';
import * as L from 'leaflet';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: L.Map;

  constructor() { }

  initialize(mapId: string) {
    this.map = L.map(mapId).setView([60.170126, 24.938742], 15);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: environment.mapToken
    }).addTo(this.map);
  }
}
