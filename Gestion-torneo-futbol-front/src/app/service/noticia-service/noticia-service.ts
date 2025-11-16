import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Noticia from '../../model/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  private apiUrl = 'http://localhost:8080/api/noticia';


  constructor(private http: HttpClient) { }

  getNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.apiUrl);
  }

  getNoticiaById(id: string): Observable<Noticia> {
    return this.http.get<Noticia>(`${this.apiUrl}/${id}`);
  }

  postNoticia(noticia: Noticia): Observable<Noticia> {
    return this.http.post<Noticia>(`${this.apiUrl}/addNoticia`, noticia);
  }

  updateNoticia(noticia: Noticia): Observable<Noticia> {
    return this.http.put<Noticia>(`${this.apiUrl}/updateNoticia/${noticia.id}`, noticia);
  }

  deleteNoticia(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteNoticia/${id}`);
  }
}

