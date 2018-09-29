import { Component } from '@angular/core';
import { MapService } from '../map.service';
import { MatDialog } from '@angular/material';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(
    private mapService: MapService,
    private dialog: MatDialog
  ) {}

  clearMap() {
    this.mapService.clearMap();
  }

  openAboutDialog() {
    this.dialog.open(AboutComponent, {
      disableClose: true
    });
  }
}
