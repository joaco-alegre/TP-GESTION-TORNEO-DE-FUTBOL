import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { TranslocoPipe } from '@ngneat/transloco';
import { ContactoService } from '../../service/contacto-service/contacto-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TranslocoPipe, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  
  contactoForm: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private contactoService: ContactoService
  ) {
    this.contactoForm = this.fb.group({
      nombre: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      consulta: ['', Validators.required]
    });
  }

  onContactoSubmit(): void {
    if (this.contactoForm.invalid) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    this.contactoService.postMensaje(this.contactoForm.value).subscribe(() => {
      alert("¡Mensaje enviado con éxito!");
      this.contactoForm.reset();
    }, (error) => {
      console.error(error);
      alert("Error al enviar el mensaje. Inténtalo de nuevo.");
    });
  }

}
