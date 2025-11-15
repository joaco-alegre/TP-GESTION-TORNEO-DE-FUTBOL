import { CommonModule, Location} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';

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

    //usamos esto para simular
    const email = this.usuarioForm.value.email;
    const password = this.usuarioForm.value.password;

    if (email === 'joaco12-2002@hotmail.com' && password === '123') {
      
      if (this.selectedRole === 'dt') {
        this.router.navigate(['/admin-menu']); 
      } else {
        this.router.navigate(['/usuario-home']); 
      }
      
    } else {
      this.loginError = "Email o contraseña inválida."; 
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}