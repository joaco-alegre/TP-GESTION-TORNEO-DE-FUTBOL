import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import EstadisticaGoleador from '../../model/estadistica-goleador';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EstadisticaGoleadorService {

    private url = 'http://localhost:8080/api/estadistica'; 
    private nextId   = 1;

  constructor(private http: HttpClient) {}

  // Get statistics for a tournament
  getEstadisticaGoleador(idTorneo: number): Observable<EstadisticaGoleador[]> {
    return this.http.get<EstadisticaGoleador[]>(`${this.url}/get/estadisticasGoleador/${idTorneo}`);
  }

  // Generate statistics for a tournament
  generateEstadisticaGoleador(idTorneo: number): Observable<any> {
    return this.http.post<any>(`${this.url}/generar/estadisticasGoleador/${idTorneo}`, {});
  }

  // (No generic CRUD endpoints exposed in backend for individual statistics in controllers)

}
