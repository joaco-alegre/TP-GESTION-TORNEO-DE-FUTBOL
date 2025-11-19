

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, CommonModule } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { TranslocoPipe } from '@ngneat/transloco'; 
import { AuthService } from '../../../service/auth-service/auth-service';

@Component({
  selector: 'app-usuario-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoPipe,
  ],
  templateUrl: './usuario-login.html',
  styleUrls: ['./usuario-login.css']
})
export class UsuarioLogin implements OnInit {

  usuarioForm!: FormGroup; 
  selectedRole: 'usuario' | 'dt' = 'usuario'; 
  loginError: string | null = null; 

  constructor(
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {

    this.usuarioForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  setRole(role: 'usuario' | 'dt') {
    this.selectedRole = role;
  }

  onSubmit() {
    this.loginError = null;

    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }
    
    const { email, password } = this.usuarioForm.value; 

    this.authService.login(email, password, this.selectedRole).subscribe({
      next: (user) => {
        alert(`¡Bienvenido, ${user.nombre}!`);
        
        if (user.role === 'dt') {
          this.router.navigate(['/dt/dt-home/', user.id]); 
        } else {
          this.router.navigate(['/admin/usuario-home', user.id]); 
        }
      },
      error: (error: any) => {
        this.loginError = error.message || "Error de conexión. Verifica el JSON-Server."; 
        console.error("Error de autenticación:", error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}