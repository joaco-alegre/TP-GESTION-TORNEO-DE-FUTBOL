import { CommonModule, Location} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-usuario-login',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, TranslocoPipe, CommonModule],
  templateUrl: './usuario-login.html',
  styleUrl: './usuario-login.css',
})
export class UsuarioLogin{

  usuarioForm!: FormGroup; 
  
  selectedRole: 'usuario' | 'dt' = 'usuario'; 


  constructor(private router: Router,
    private location: Location
  ) {}

  setRole(role: 'usuario' | 'dt') {
    this.selectedRole = role;
  }

  FuncionLogin() {
    this.router.navigate(['/usuario-home']); 
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      
      const loginData = {
        ...this.usuarioForm.value,
        role: this.selectedRole 
      };

      console.log('Intentando iniciar sesión con:', loginData);
      this.router.navigate(['/usuario-home']);
    }
  }

      goBack(): void {
    this.location.back();
  }
}

