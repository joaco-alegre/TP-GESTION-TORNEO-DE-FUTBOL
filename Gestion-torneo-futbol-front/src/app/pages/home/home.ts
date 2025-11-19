import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { TranslocoPipe } from '@ngneat/transloco';
import { ContactoService } from '../../service/contacto-service/contacto-service';
import Noticia from '../../model/noticia';
import { NoticiaService } from '../../service/noticia-service/noticia-service';
import { UsuarioService } from '../../service/usuario-service/usuario-service';
import Usuario from '../../model/usuario';
import { TorneoService } from '../../service/torneo-service/torneo-service';
import Torneo from '../../model/torneo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TranslocoPipe, ɵInternalFormsSharedModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  
  contactoForm: FormGroup;

  noticias: Noticia[]=[];
  usuarios: Usuario[]=[];
  torneos: Torneo[]=[];
  

  constructor(
    private fb: FormBuilder,
    private contactoService: ContactoService,
    private noticiaService: NoticiaService,
    private usuarioService: UsuarioService,
    private torneoService: TorneoService
  ) {
    this.contactoForm = this.fb.group({
      nombre: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      consulta: ['', Validators.required]
    });
  }

  ngOnInit(): void { 
    this.noticiaService.getNoticias().subscribe(data => {
      this.noticias = data.slice(0, 4);
    });

    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });


    this.torneoService.getTorneo().subscribe(data => {
      this.torneos = data;
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
