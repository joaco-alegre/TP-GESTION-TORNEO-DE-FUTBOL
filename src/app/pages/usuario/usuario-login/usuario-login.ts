import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-login.html',
  styleUrl: './usuario-login.css'
})
export class UsuarioLogin {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res: any) => {
        const token = res.token || res.accessToken || res.jwt;
        if (token) {
          this.auth.saveToken(token);
          this.router.navigate(['/es']);
        } else {
          this.error = 'Token no recibido';
        }
      },
      error: (err) => {
        this.error = 'Credenciales inválidas';
      }
    });
  }
}
