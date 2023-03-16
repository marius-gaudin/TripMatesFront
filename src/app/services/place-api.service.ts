import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaceResult } from '../models/placeResult';

@Injectable({
  providedIn: 'root'
})
export class PlaceApiService {

  urlTextSearch: string = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='
  urlPlaceDetails: string = 'https://maps.googleapis.com/maps/api/place/details/json?fields=address_components&place_id='
  key: string = '&key=AIzaSyBFbHiZqusutD1evo40iesY7-wc7csneFA'

  constructor(private _http: HttpClient) { }

  searchPlace(text: string): Observable<PlaceResult[]> {
    return this._http.get<PlaceResult[]>(`${this.urlTextSearch}${text}${this.key}`);
  }
}
