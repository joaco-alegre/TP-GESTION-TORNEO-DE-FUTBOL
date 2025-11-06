import { Component, Input, OnInit } from '@angular/core';
import Equipo from '../../../model/equipo';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Torneo from '../../../model/torneo';
import { Title } from '@angular/platform-browser';
import { TorneoService } from '../../../service/torneo-service/torneo-service';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-list',
  imports: [CommonModule, RouterModule, TranslocoPipe],
  templateUrl: './torneo-details.html',
  styleUrl: './torneo-details.css'
})
export class TorneoDetails implements OnInit{

  torneo: Torneo | undefined;
  id: string | null = null;

  todosEquipos: Equipo[] = [];
  filtrarEquipos: Equipo[] = [];


  constructor(private equipoService: EquipoService,
              private torneoService: TorneoService,
              private route: ActivatedRoute,
              private tituloService: Title
  ) {}

ngOnInit(): void {
  // 1. Obtenemos el ID de la URL de forma segura
  this.id = this.route.snapshot.paramMap.get('id');

  // 2. Si no hay ID, no hacemos nada
  if (!this.id) {
    console.error('No se encontró ID en la URL');
    this.tituloService.setTitle('Torneo no encontrado');
    return;
  }

  console.log('ID del torneo recibido:', this.id);

  // 3. --- ESTO ES LO NUEVO ---
  // Buscamos los detalles del torneo usando su ID
  this.torneoService.getTorneoById(this.id).subscribe(torneoEncontrado => {
    
    // 4. ¡Guardamos el torneo! 
    // Ahora tu HTML @if(torneo) funcionará
    this.torneo = torneoEncontrado; 
    
    // 5. Ponemos el título (esta forma es más segura)
    if (torneoEncontrado) {
      this.tituloService.setTitle(`Torneo: ${torneoEncontrado.nombre}`);
    } else {
      this.tituloService.setTitle('Torneo no encontrado');
    }
  });

  // 6. --- TU CÓDIGO EXISTENTE ---
  // Hacemos la llamada para traer los equipos
  this.equipoService.getEquipos().subscribe(data => {
    console.log('Datos recibidos del servicio:', data); 
    this.todosEquipos = data;
    
    // Filtramos los equipos que pertenecen a este torneo
    this.filtrarEquiposPorTorneo(); 
  });
}

  filtrarEquiposPorTorneo(): void {
    if (this.id) {
      this.filtrarEquipos = this.todosEquipos.filter(
        (equipo) => equipo.idTorneo === this.id
      );
      console.log('Equipos filtrados:', this.filtrarEquipos);
    }
  }


/*
  getEquipos(): void {
    this.equipoService.getEquipos().subscribe(data => {
      console.log(data)
      this.equipos = data});
  }

  deleteEquipo(id: string): void {
  
      this.equipoService.deleteEquipo(id).subscribe(() => this.getEquipos());
    
  }*/
  
}
