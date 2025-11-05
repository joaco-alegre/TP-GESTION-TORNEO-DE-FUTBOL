import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import Jugador from '../../model/jugador';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class JugadorService{

      private url = 'http://localhost:3002/jugadores'; 
    private nextId   = 1;

  constructor(private http: HttpClient) {}

  getJugadores(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(this.url);
  }

  getJugadorById(id: string): Observable<Jugador> {
    return this.http.get<Jugador>(`${this.url}/${id}`);
  }


  postJugador(jugador: Jugador): Observable<Jugador> {
    //jugador.id = this.nextId++;
    return this.http.post<Jugador>(this.url, jugador);
  }

  updateJugador(jugador: Jugador): Observable<Jugador> {
    return this.http.put<Jugador>(`${this.url}/${jugador.id}`, jugador);
  }

  deleteJugador(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}