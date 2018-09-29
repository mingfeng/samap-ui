import { Component } from '@angular/core';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatCardModule,
  MatFormFieldModule,
  MatDialog
} from '@angular/material';

import { NavComponent } from './nav.component';
import { MapService } from '../map.service';

@Component({selector: 'app-map', template: ''})
class MapStubComponent {}

@Component({selector: 'app-settings', template: ''})
class SettingsStubComponent {}

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let mapServiceSpy: jasmine.SpyObj<MapService>;

  beforeEach(fakeAsync(() => {
    mapServiceSpy = jasmine.createSpyObj('MapService', ['clearMap']);

    TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      declarations: [
        NavComponent,
        MapStubComponent,
        SettingsStubComponent
      ],
      providers: [
        { provide: MapService, useValue: mapServiceSpy },
        { provide: MatDialog, useValue: {}}
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

  it('should call spy map service clearMap', () => {
    component.clearMap();
    expect(mapServiceSpy.clearMap).toHaveBeenCalled();
  });
});
