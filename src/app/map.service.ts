import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';

import { environment } from '../environments/environment';
import { RestService } from './rest.service';
import { SettingService } from './setting.service';
import { DEFAULT_BASEMAP } from './constants';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private basemaps: {[id: string]: L.TileLayer} = {};
  private map: L.Map;
  private currentBasemap: string;

  private markers: Array<L.Marker> = [];
  private serviceAreas: Array<L.GeoJSON<L.Polygon>> = [];

  private _isRequestingData = false;

  constructor(
    private restService: RestService,
    private settingService: SettingService
  ) { }

  get isRequestingData() {
    return this._isRequestingData;
  }

  initialize(mapId: string) {
    this.map = L.map(mapId).setView([60.170126, 24.938742], 15);
    this.map.on('click', (e: L.LeafletMouseEvent) => this.requestServiceArea(e.latlng));
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

  clearMap() {
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.serviceAreas.forEach(serviceArea => this.map.removeLayer(serviceArea));
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

  private requestServiceArea(latlng: L.LatLng) {
    if (this._isRequestingData) {
      return;
    }
    this._isRequestingData = true;
    this.restService.getServiceArea(latlng.lng, latlng.lat, this.settingService.travelDistance, 'EPSG:4326')
      .subscribe(
        (serviceArea: geojson.Polygon) => {
          this.createMarker(latlng);
          this.createServiceArea(serviceArea);
          this._isRequestingData = false;
        },
        (error) => {
          console.error(error);
          this._isRequestingData = false;
        }
      );
  }

  private createMarker(latlng: L.LatLng) {
    const icon = L.icon({
      iconUrl: 'assets/images/place.svg',
      iconSize: [24, 24],
      iconAnchor: [12, 24]
    });
    const marker = L.marker(latlng, {icon}).addTo(this.map);
    marker.on('click', () => {
      this.requestServiceArea(marker.getLatLng());
    });
    this.markers.push(marker);
  }

  private createServiceArea(area: geojson.Polygon) {
    const serviceArea = L.geoJSON(area, {
      style: () => {
        return { color: this.settingService.serviceAreaColor };
      }
    }).addTo(this.map);
    this.serviceAreas.push(serviceArea);
  }
}
