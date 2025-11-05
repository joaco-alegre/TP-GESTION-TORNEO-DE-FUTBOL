import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Equipo from '../../model/equipo';

@Injectable({
  providedIn: 'root'
})

export class EquipoService{

      private url = 'http://localhost:3001/equipos'; 
    //private nextId   = 1;

  constructor(private http: HttpClient) {}

  getEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.url);
  }

  getEquipoById(id: string): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.url}/${id}`);
  }


  postEquipo(equipo: Equipo): Observable<Equipo> {
    //equipo.id = this.nextId++;
    return this.http.post<Equipo>(this.url, equipo);
  }

  updateEquipo(equipo: Equipo): Observable<Equipo> {
    return this.http.put<Equipo>(`${this.url}/${equipo.id}`, equipo);
  }

  deleteEquipo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
