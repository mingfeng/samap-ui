import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';

import { environment } from '../environments/environment';
import { RestService } from './rest.service';
import { StorageService } from './storage.service';
import { DEFAULT_BASEMAP } from './constants';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private basemaps: {[id: string]: L.TileLayer} = {};
  private map: L.Map;
  private currentBasemap: string;

  constructor(
    private restService: RestService,
    private storageService: StorageService
  ) { }

  initialize(mapId: string) {
    this.map = L.map(mapId).setView([60.170126, 24.938742], 15);
    this.map.on('click', (e: L.LeafletMouseEvent) => this.drawServiceArea(e.latlng));
    this.activateBasemap(DEFAULT_BASEMAP);
  }

  activateBasemap(basemap: string) {
    if (this.currentBasemap) {
      this.map.removeLayer(this.basemaps[this.currentBasemap]);
    }
    if (!this.basemaps.hasOwnProperty(basemap)) {
      this.basemaps[basemap] = this.createBasemap(basemap);
    }
    this.map.addLayer(this.basemaps[basemap]);
    this.currentBasemap = basemap;
  }

  getCurrentBasemap(): string {
    return this.currentBasemap;
  }

  private createBasemap(basemap: string): L.TileLayer {
    return L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: basemap,
      accessToken: environment.mapToken
    });
  }

  private drawServiceArea(latlng: L.LatLng) {
    this.restService.getServiceArea(latlng.lng, latlng.lat, this.storageService.travelDistance, 'EPSG:4326')
      .subscribe((serviceArea: geojson.Polygon) => {
        L.marker(latlng, {
          icon: L.icon({ iconUrl: 'assets/images/place.svg' })
        }).addTo(this.map);
        L.geoJSON(serviceArea).addTo(this.map);
      });
  }
}
