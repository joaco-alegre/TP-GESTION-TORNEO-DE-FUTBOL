import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Torneo from '../../model/torneo';

@Injectable({
  providedIn: 'root'
})

export class TorneoService {

  private url = 'http://localhost:8080/api/tournament'; 

  constructor(private http: HttpClient) {}

  // GET lista de torneos
  getTorneos(): Observable<Torneo[]> {
    return this.http.get<Torneo[]>(`${this.url}/getListTorneo`);
  }

  // GET torneo por ID
  getTorneoById(id: string | number): Observable<Torneo> {
    return this.http.get<Torneo>(`${this.url}/${id}`);
  }

  // POST crear torneo
  postTorneo(torneo: Torneo): Observable<any> {
    return this.http.post(`${this.url}/addTournament`, torneo);
  }

  // PUT actualizar torneo
  updateTorneo(id: number, torneo: Torneo): Observable<any> {
    return this.http.put(`${this.url}/updateTournament/${id}`, torneo);
  }

  // DELETE torneo
  deleteTorneo(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

}