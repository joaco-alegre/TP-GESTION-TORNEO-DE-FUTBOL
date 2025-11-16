import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import Fixture from '../../model/fixture';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FixtureService {

  
      private url = 'http://localhost:8080/api/fixture'; 
    //private nextId   = 1;

  constructor(private http: HttpClient) {}

  getFixtures(idTorneo: number): Observable<Fixture[]> {
    // request fixtures for a specific tournament
    return this.http.get<Fixture[]>(`${this.url}/get/fixture/${idTorneo}`);
  }

  getFixtureById(id: string | number): Observable<Fixture> {
    // Backend currently exposes fixtures by tournament; there is no dedicated GET by fixture id.
    // Keep a GET here for compatibility; components may need to fetch all fixtures for a tournament
    // and filter client-side instead.
    return this.http.get<Fixture>(`${this.url}/get/fixture/${id}`);
  }


  postFixture(fixture: Fixture): Observable<Fixture> {
    //fixture.id = this.nextId++;
    return this.http.post<Fixture>(`${this.url}/generate`, fixture);
  }

  updateFixture(fixture: Fixture): Observable<Fixture> {
    return this.http.put<Fixture>(`${this.url}/update/fixture`, fixture);
  }

  deleteFixture(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete/fixture/${id}`);
  }

}
