import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import Jugador from '../../model/jugador';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class JugadorService{

  private url = 'http://localhost:8080/api/player'; 
    private nextId   = 1;

  constructor(private http: HttpClient) {}

  getJugadores(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(`${this.url}/allPlayers`);
  }

  getJugadorById(id: string | number): Observable<Jugador> {
    return this.http.get<Jugador>(`${this.url}/get/player/byID/${id}`);
  }


  postJugador(jugador: Jugador): Observable<Jugador> {
    //jugador.id = this.nextId++;
    return this.http.post<Jugador>(`${this.url}/addPlayer`, jugador);
  }

  updateJugador(jugador: Jugador): Observable<Jugador> {
    return this.http.put<Jugador>(`${this.url}/update/player/${jugador.id}`, jugador);
  }

  deleteJugador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete/player/byID/${id}`);
  }

}