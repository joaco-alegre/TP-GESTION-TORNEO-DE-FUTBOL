import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import EstadisticaGoleador from '../../model/estadistica-goleador';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EstadisticaGoleadorService {

    private url = 'http://localhost:3000/estadisticasGoleadores'; 
    private nextId   = 1;

  constructor(private http: HttpClient) {}

  getEstadisticaGoleador(): Observable<EstadisticaGoleador[]> {
    return this.http.get<EstadisticaGoleador[]>(this.url);
  }

  getEstadisticaGoleadorById(id: number): Observable<EstadisticaGoleador> {
    return this.http.get<EstadisticaGoleador>(`${this.url}/${id}`);
  }


  postEstadisticaGoleador(estadisticaGoleador: EstadisticaGoleador): Observable<EstadisticaGoleador> {
    //estadisticaGoleador.id = this.nextId++;
    return this.http.post<EstadisticaGoleador>(this.url, estadisticaGoleador);
  }

  updateEstadisticaGoleador(estadisticaGoleador: EstadisticaGoleador): Observable<EstadisticaGoleador> {
    return this.http.put<EstadisticaGoleador>(`${this.url}/${estadisticaGoleador.id}`, estadisticaGoleador);
  }

  deleteEstadisticaGoleador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getEstadisticaGoleadorByIdJugador(idJugador: number): Observable<EstadisticaGoleador | undefined> {
    return this.http.get<EstadisticaGoleador[]>(this.url).pipe(
      map(estadisticas => 
        estadisticas.find(stat => stat.idJugador === idJugador)
      )
    );
  }


}
