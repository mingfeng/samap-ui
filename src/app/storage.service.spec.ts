import { TestBed, inject } from '@angular/core/testing';

import { StorageService, DEFAULT_DISTANCE } from './storage.service';

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
      distance: DEFAULT_DISTANCE
    });
  }));

  it('should return saved settings if available', inject([StorageService], (service: StorageService) => {
    localStorage.setItem('settings-distance', '12345');
    expect(service.settings).toEqual({
      distance: 12345
    });
  }));

  it('should update local storage when set settings property', inject([StorageService], (service: StorageService) => {
    service.settings = {
      distance: 54321
    };
    const savedDistance = localStorage.getItem('settings-distance');
    expect(savedDistance).toEqual('54321');
  }));
});
