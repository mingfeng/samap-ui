import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  travelTimeControl = new FormControl('', [
    Validators.required,
    Validators.min(10),
    Validators.max(120)
  ]);

  constructor() {}

}
