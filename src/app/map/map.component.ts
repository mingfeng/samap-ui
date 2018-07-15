import { AfterViewInit, Component } from '@angular/core';
import { MapService } from '../map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  mapId = 'map';

  constructor(private mapService: MapService) { }

  ngAfterViewInit() {
    this.mapService.initialize(this.mapId);
  }
}
