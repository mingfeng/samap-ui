import { Component } from '@angular/core';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonToggleModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';

import { NavComponent } from './nav.component';

@Component({selector: 'app-map', template: ''})
class MapStubComponent {}

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatButtonToggleModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      declarations: [
        NavComponent,
        MapStubComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
