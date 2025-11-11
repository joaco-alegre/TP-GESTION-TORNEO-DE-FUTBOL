import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Noticia from '../../model/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  private apiUrl = 'http://localhost:3006/noticias';


  constructor(private http: HttpClient) { }

  getNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.apiUrl);
  }

  getNoticiaById(id: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${id}`);
  }

  postNoticia(noticia: Noticia): Observable<Noticia> {
    return this.http.post<Noticia>(this.apiUrl, noticia);
  }

  updateNoticia(noticia: Noticia): Observable<Noticia> {
    return this.http.put<Noticia>(`${this.apiUrl}/${noticia.id}`, noticia);
  }

  deleteNoticia(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
}

