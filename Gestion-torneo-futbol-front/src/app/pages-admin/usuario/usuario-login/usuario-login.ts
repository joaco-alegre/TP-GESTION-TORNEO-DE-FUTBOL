import { CommonModule, Location} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import { AuthService } from '../../../service/auth-service/auth-service';

@Component({
  selector: 'app-usuario-login',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, TranslocoPipe, CommonModule],
  templateUrl: './usuario-login.html',
  styleUrl: './usuario-login.css',
})
export class UsuarioLogin implements OnInit{

  usuarioForm!: FormGroup; 
  loginError?: string;
  
  selectedRole: 'usuario' | 'dt' = 'usuario'; 


  constructor(private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private authService: AuthService
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
    
    this.loginError = '';

    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched(); 
      return; 
    }

    const { email, password } = this.usuarioForm.value;


    this.authService.login(email, password, this.selectedRole).subscribe({
    next: (user) => {
      if (user.role === 'dt') {
        alert(`¡Bienvenido, ${user.nombre}!`);
        this.router.navigate(['/dt', 'dt-home']); 
      } else {
        alert(`¡Bienvenido, ${user.nombre}!`);
        this.router.navigate(['/admin', 'usuario-home', ]); 
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