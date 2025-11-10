import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import DT from '../../model/dt';

@Injectable({
  providedIn:'root'
})
export class DtService {

   private url = 'http://localhost:3003/DTs'; 
    //private nextId   = 1;

  constructor(private http: HttpClient) {}

  getDTs(): Observable<DT[]> {
    return this.http.get<DT[]>(this.url);
  }

  geDtById(id: string): Observable<DT> {
    return this.http.get<DT>(`${this.url}/${id}`);
  }


  postDT(dt: DT): Observable<DT> {
    //dt.id = this.nextId++;
    return this.http.post<DT>(this.url, dt);
  }

  updateDt(dt: DT): Observable<DT> {
    return this.http.put<DT>(`${this.url}/${dt.id}`, dt);
  }

  deleteDt(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
