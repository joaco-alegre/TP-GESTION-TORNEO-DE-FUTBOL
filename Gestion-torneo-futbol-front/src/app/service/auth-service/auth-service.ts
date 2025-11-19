// En: src/app/services/auth.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private usuariosUrl = 'http://localhost:3000/usuarios';
  private dtsUrl = 'http://localhost:3000/DTs';

  constructor(private http: HttpClient, private router: Router) {}

login(email: string, password: string, role: string): Observable<any> {

    const apiUrl = role === 'dt' ? this.dtsUrl : this.usuariosUrl;
    
    return this.http.get<any[]>(`${apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users && users.length > 0) {
          const user = users[0];
          
          const payload: any = { 
            id: user.id, 
            nombre: user.nombre, 
            role: role, 
          };

          if (role === 'dt') {
            payload.idEquipo = user.idEquipo || null; 
          }

          localStorage.setItem('token', btoa(JSON.stringify(payload)));
          
          return payload; 
        }
        
        throw new Error('Credenciales inválidas');
      })
    );
  }

  getUser(): any | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      return JSON.parse(atob(token));
    } catch (e) {
      this.logout();
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/es/inicio-sesion']); 
  }

}








