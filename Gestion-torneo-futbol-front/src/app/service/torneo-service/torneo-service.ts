import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Torneo from '../../model/torneo';

@Injectable({
  providedIn: 'root'
})

export class TorneoService{

      private url = 'http://localhost:3000/torneos'; 
    private nextId   = 1;

  constructor(private http: HttpClient) {}

  getTorneo(): Observable<Torneo[]> {
    return this.http.get<Torneo[]>(this.url);
  }

  getTorneoById(id: string): Observable<Torneo> {
    return this.http.get<Torneo>(`${this.url}/${id}`);
  }


  postTorneo(torneo: Torneo): Observable<Torneo> {
    //torneo.id = this.nextId++;
    return this.http.post<Torneo>(this.url, torneo);
  }

  updateTorneo(torneo: Torneo): Observable<Torneo> {
    return this.http.put<Torneo>(`${this.url}/${torneo.id}`, torneo);
  }

  deleteTorneo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}