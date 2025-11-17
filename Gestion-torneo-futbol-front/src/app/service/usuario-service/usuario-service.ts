import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import Usuario from '../../model/usuario';
import { Observable } from 'rxjs';
import { UserDTO } from './user-dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listUser`);
  }

  getUsuarioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getUserByEmail?email=${encodeURIComponent(email)}`);
  }

  postUsuario(usuario: UserDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addUser`, usuario);
  }

  updateUsuario(usuario: UserDTO): Observable<any> {
    const id = usuario.idUsuario;
    return this.http.put<any>(`${this.apiUrl}/updateUser/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}