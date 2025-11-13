import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Contacto from '../../model/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

private apiUrl = 'http://localhost:3000/mensajes';

  constructor(private http: HttpClient) { }

  postMensaje(mensaje: Contacto): Observable<Contacto> {
    return this.http.post<any>(this.apiUrl, mensaje);
  }

  getMensajes(): Observable<Contacto[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteMensaje(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
}
