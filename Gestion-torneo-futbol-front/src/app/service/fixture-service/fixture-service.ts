import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import Fixture from '../../model/fixture';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FixtureService {

  
      private url = 'http://localhost:3004/fixtures'; 
    //private nextId   = 1;

  constructor(private http: HttpClient) {}

  getFixtures(): Observable<Fixture[]> {
    return this.http.get<Fixture[]>(this.url);
  }

  getFixtureById(id: string): Observable<Fixture> {
    return this.http.get<Fixture>(`${this.url}/${id}`);
  }


  postFixture(fixture: Fixture): Observable<Fixture> {
    //fixture.id = this.nextId++;
    return this.http.post<Fixture>(this.url, fixture);
  }

  updateFixture(fixture: Fixture): Observable<Fixture> {
    return this.http.put<Fixture>(`${this.url}/${fixture.id}`, fixture);
  }

  deleteFixture(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
