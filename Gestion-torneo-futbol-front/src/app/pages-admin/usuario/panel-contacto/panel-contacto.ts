import { Component, OnInit } from '@angular/core';
import { ContactoService } from '../../../service/contacto-service/contacto-service';

@Component({
  selector: 'app-panel-contacto',
  imports: [],
  templateUrl: './panel-contacto.html',
  styleUrl: './panel-contacto.css',
})
export class PanelContacto implements OnInit{

  mensajes: any[] = [];

  constructor(private contactoService: ContactoService) {}

  ngOnInit(): void {
    this.cargarMensajes();
  }

  cargarMensajes(): void {
    this.contactoService.getMensajes().subscribe(data => {
      this.mensajes = data.reverse(); 
    });
  }

}
