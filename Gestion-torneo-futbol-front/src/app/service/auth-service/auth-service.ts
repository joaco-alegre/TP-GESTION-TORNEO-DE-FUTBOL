import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginRequest { email: string; password: string }
interface LoginResponse { token: string; email: string; role: string }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(res => {
          if (res && res.token) {
            localStorage.setItem('auth_token', res.token);
            localStorage.setItem('auth_email', res.email);
            localStorage.setItem('auth_role', res.role);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_email');
    localStorage.removeItem('auth_role');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getEmail(): string | null {
    return localStorage.getItem('auth_email');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    return localStorage.getItem('auth_role');
  }
}
