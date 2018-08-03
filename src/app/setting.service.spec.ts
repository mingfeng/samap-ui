import { TestBed, inject } from '@angular/core/testing';

import { SettingService } from './setting.service';
import { TravelMode } from './enums';

describe('SettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingService]
    });
  });

  it('should be created', inject([SettingService], (service: SettingService) => {
    expect(service).toBeTruthy();
  }));

  it('should return correct travel distance', inject([SettingService], (service: SettingService) => {
    service.travelMode = TravelMode.BIKE;
    service.travelTime = 60;
    expect(service.travelDistance).toEqual(15000);
  }));

});
