import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';

import { environment } from '../environments/environment';
import { RestService } from './rest.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: L.Map;
  private serviceArea: L.GeoJSON<L.Polygon>;

  constructor(
    private rest: RestService,
    private storage: StorageService
  ) { }

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

    this.map.on('click', (e: L.LeafletMouseEvent) => this.drawServiceArea(e.latlng));
  }

  private drawServiceArea(latlng: L.LatLng) {
    if (this.serviceArea) {
      this.serviceArea.remove();
    }
    this.rest.getServiceArea(latlng.lng, latlng.lat, this.storage.travelDistance, 'EPSG:4326')
      .subscribe((serviceArea: geojson.Polygon) => {
        this.serviceArea = L.geoJSON(serviceArea).addTo(this.map);
      });
  }
}
