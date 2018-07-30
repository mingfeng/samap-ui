import { Component } from '@angular/core';
import { MapService } from '../map.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private mapService: MapService) {}

  clearMap() {
    this.mapService.clearMap();
  }
}
