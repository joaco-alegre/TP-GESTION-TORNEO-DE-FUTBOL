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
  
  selectedRole: 'usuario' | 'dt' = 'usuario'; 


  constructor(private router: Router,
    private location: Location,
    private fb: FormBuilder
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
    
    if (this.usuarioForm.valid) { 
      
      const loginData = {
        ...this.usuarioForm.value,
        role: this.selectedRole 
      };

      console.log('Intentando iniciar sesión con:', loginData);

      if (this.selectedRole === 'dt') {
        this.router.navigate(['/dt-home']); 
      } else {
        this.router.navigate(['/usuario-home']); 
      }     
    } else {
      this.usuarioForm.markAllAsTouched();
    }
  }

  goBack(): void {

    this.location.back();

  }

}