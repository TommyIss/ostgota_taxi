import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OnewayTrip } from '../modules/oneway-trip';
import { RoundTrip } from '../modules/round-trip';
import { GetOnewayTrip } from '../modules/get-oneway-trip';
import { GetRoundTrip } from '../modules/get-round-trip';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  url: string = 'https://ostgotataxi-webservice.onrender.com/';
  constructor(private http: HttpClient) { }

  // Metoder för enkelresor
  getOnewayTrips(): Observable<GetOnewayTrip[]>{
    return this.http.get<GetOnewayTrip[]>(this.url + 'oneway_trip');
  }

  getChosenOnewayTrip(id: number): Observable<GetOnewayTrip>{
    return this.http.get<GetOnewayTrip>(`${this.url}oneway_trip/${id}`);
  }

  postOnewaytrip(newTrip: OnewayTrip): Observable<OnewayTrip> {
    return this.http.post<OnewayTrip>(`${this.url}oneway_trip`, newTrip, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateOnewayTrip(id: number, newTrip: OnewayTrip):Observable<OnewayTrip> {
    return this.http.put<OnewayTrip>(`${this.url}oneway_trip/${id}`, newTrip, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteOnewayTrip(id: number):Observable<void> {
    return this.http.delete<void>(`${this.url}oneway_trip/${id}`);
  }

  // Metoder för tur och retur-resor
  getRoundTrips(): Observable<GetRoundTrip[]>{
    return this.http.get<GetRoundTrip[]>(this.url + 'round_trip');
  }

  getChosenRoundTrip(id: number): Observable<GetRoundTrip>{
    return this.http.get<GetRoundTrip>(`${this.url}round_trip/${id}`);
  }

  postRoundtrip(newTrip: RoundTrip): Observable<RoundTrip> {
    return this.http.post<RoundTrip>(`${this.url}round_trip`, newTrip, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  
  updateRoundTrip(id: number, newTrip: RoundTrip):Observable<RoundTrip> {
    return this.http.put<RoundTrip>(`${this.url}round_trip/${id}`, newTrip, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteRoundTrip(id: number):Observable<void> {
    return this.http.delete<void>(`${this.url}round_trip/${id}`);
  }
}
