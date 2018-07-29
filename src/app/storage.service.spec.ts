import { TestBed, inject } from '@angular/core/testing';

import { StorageService, DEFAULT_TRAVEL_MODE, DEFAULT_TRAVEL_TIME } from './storage.service';
import { TravelMode } from './enums';
import { DEFAULT_BASEMAP } from './constants';

const data = {};

const mockSessionStorage = {
  getItem: (key) => {
    return data[key] || null;
  },

  setItem: (key, value) => {
    data[key] = value;
  }
};

describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });

    spyOn(sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    spyOn(sessionStorage, 'setItem').and.callFake(mockSessionStorage.setItem);
  });

  it('should be created', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));

  it('should return default settings when no saved settings available', inject([StorageService], (service: StorageService) => {
    expect(service.settings).toEqual({
      basemap: DEFAULT_BASEMAP,
      travelMode: DEFAULT_TRAVEL_MODE,
      travelTime: DEFAULT_TRAVEL_TIME
    });
  }));

  it('should return saved settings if available', inject([StorageService], (service: StorageService) => {
    sessionStorage.setItem('settings-basemap', 'dummy-basemap');
    sessionStorage.setItem('settings-travelMode', 'car');
    sessionStorage.setItem('settings-travelTime', '12345');
    expect(service.settings).toEqual({
      basemap: 'dummy-basemap',
      travelMode: TravelMode.CAR,
      travelTime: 12345
    });
  }));

  it('should update local storage when set settings property', inject([StorageService], (service: StorageService) => {
    service.settings = {
      basemap: 'dummy-basemap',
      travelMode: TravelMode.BIKE,
      travelTime: 54321
    };
    const savedBasemap = sessionStorage.getItem('settings-basemap');
    const savedTravelMode = sessionStorage.getItem('settings-travelMode');
    const savedTravelTime = sessionStorage.getItem('settings-travelTime');
    expect(savedBasemap).toEqual('dummy-basemap');
    expect(savedTravelMode).toEqual('bike');
    expect(savedTravelTime).toEqual('54321');
  }));

  it('should return correct travel distance', inject([StorageService], (service: StorageService) => {
    service.settings = {
      basemap: 'dummy-basemap',
      travelMode: TravelMode.BIKE,
      travelTime: 60
    };
    expect(service.travelDistance).toEqual(15000);
  }));

});
