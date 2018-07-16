import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  getServiceArea(x: number, y: number, distance: number, srs: string) {
    const url = `${environment.apiUrl}service-area/?location=${x},${y}&distance=${distance}&srs=${srs}`;
    return this.http.get(url);
  }
}
