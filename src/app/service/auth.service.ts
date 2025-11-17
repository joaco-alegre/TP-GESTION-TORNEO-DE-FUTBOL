import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE } from '../config/api-config';

interface LoginResponse {
  token: string;
  // optionally other fields like username, roles
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(`${API_BASE}/auth/login`, { username, password });
  }

  register(user: any) {
    return this.http.post(`${API_BASE}/auth/register`, user);
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const t = this.getToken();
    return !!t;
  }

  getRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded.roles || decoded.authorities || [];
    } catch (e) {
      return [];
    }
  }

  isAdmin(): boolean {
    const roles = this.getRoles();
    return roles.includes('ROLE_ADMIN') || roles.includes('ADMIN');
  }
}
