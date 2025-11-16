import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Equipo from '../../model/equipo';

@Injectable({
  providedIn: 'root'
})

export class EquipoService{

  private url = 'http://localhost:8080/api/team'; 
    //private nextId   = 1;

  constructor(private http: HttpClient) {}

  getEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${this.url}/listTeam`);
  }

  getEquipoById(id: string | number): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.url}/getListTeamPlayerByID/${id}`);
  }


  postEquipo(equipo: Equipo, idTorneo: number): Observable<Equipo> {
    //equipo.id = this.nextId++;
    return this.http.post<Equipo>(`${this.url}/addTeam/${idTorneo}`, equipo);
  }

  updateEquipo(id: number, idDt: number): Observable<Equipo> {
    return this.http.put<Equipo>(`${this.url}/updateDtTeam/${id}/assingnamentDT/${idDt}`, {});
  }

  updateEquipoDetails(equipo: Equipo): Observable<Equipo> {
    // Backend currently doesn't expose a general "update team" endpoint in controllers;
    // keep a PUT to the resource path for compatibility (may 404 if backend doesn't implement it).
    return this.http.put<Equipo>(`${this.url}/${equipo.id}`, equipo);
  }

  deleteEquipo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/deleteTeam/${id}`);
  }

}
