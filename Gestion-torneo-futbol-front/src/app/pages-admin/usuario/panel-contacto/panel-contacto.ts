import { Component, OnInit } from '@angular/core';
import { ContactoService } from '../../../service/contacto-service/contacto-service';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-panel-contacto',
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './panel-contacto.html',
  styleUrl: './panel-contacto.css',
})
export class PanelContacto implements OnInit{

  mensajes: any[] = [];

  constructor(private contactoService: ContactoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.cargarMensajes();
  }

  cargarMensajes(): void {
    this.contactoService.getMensajes().subscribe(data => {
      this.mensajes = data.reverse(); 
    });
  }

    goBack(): void {
    this.location.back();
  }

}
