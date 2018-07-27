import { TestBed, inject } from '@angular/core/testing';

import { StorageService, DEFAULT_TRAVEL_MODE, DEFAULT_TRAVEL_TIME } from './storage.service';
import { TravelMode } from './enums';

const data = {};

const mockLocalStorage = {
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

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
  });

  it('should be created', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));

  it('should return default settings when no saved settings available', inject([StorageService], (service: StorageService) => {
    expect(service.settings).toEqual({
      travelMode: DEFAULT_TRAVEL_MODE,
      travelTime: DEFAULT_TRAVEL_TIME
    });
  }));

  it('should return saved settings if available', inject([StorageService], (service: StorageService) => {
    localStorage.setItem('settings-travelMode', 'car');
    localStorage.setItem('settings-travelTime', '12345');
    expect(service.settings).toEqual({
      travelMode: TravelMode.CAR,
      travelTime: 12345
    });
  }));

  it('should update local storage when set settings property', inject([StorageService], (service: StorageService) => {
    service.settings = {
      travelMode: TravelMode.BIKE,
      travelTime: 54321
    };
    const savedTravelMode = localStorage.getItem('settings-travelMode');
    const savedTravelTime = localStorage.getItem('settings-travelTime');
    expect(savedTravelMode).toEqual('bike');
    expect(savedTravelTime).toEqual('54321');
  }));

  it('should return correct travel distance', inject([StorageService], (service: StorageService) => {
    service.settings = {
      travelMode: TravelMode.BIKE,
      travelTime: 60
    };
    expect(service.travelDistance).toEqual(15000);
  }));

});
