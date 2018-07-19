import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public dialog: MatDialog) {}

  openSettingsDialog() {
    this.dialog.open(SettingsComponent, {
      width: '250px',
      disableClose: true
    });
  }

}
