import { Component, Input, OnInit } from '@angular/core';
import Equipo from '../../../model/equipo';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import { CommonModule, Location } from '@angular/common';
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
              private tituloService: Title,
              private location: Location
  ) {}

ngOnInit(): void {
  this.id = this.route.snapshot.paramMap.get('id');

  if (!this.id) {
    console.error('No se encontró ID en la URL');
    this.tituloService.setTitle('Torneo no encontrado');
    return;
  }

  console.log('ID del torneo recibido:', this.id);

  this.torneoService.getTorneoById(this.id).subscribe(torneoEncontrado => {
    this.torneo = torneoEncontrado; 
    if (torneoEncontrado) {
      this.tituloService.setTitle(`Torneo: ${torneoEncontrado.nombre}`);
    } else {
      this.tituloService.setTitle('Torneo no encontrado');
    }
  });

  this.equipoService.getEquipos().subscribe(data => {
    console.log('Datos recibidos del servicio:', data); 
    this.todosEquipos = data;
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


    goBack(): void {
    this.location.back();
  }

  
}
