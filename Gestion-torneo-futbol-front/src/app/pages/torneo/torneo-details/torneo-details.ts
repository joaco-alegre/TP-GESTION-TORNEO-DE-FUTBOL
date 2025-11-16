import { Component, Input, OnInit } from '@angular/core';
import Equipo from '../../../model/equipo';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import Torneo from '../../../model/torneo';
import { Title } from '@angular/platform-browser';
import { TorneoService } from '../../../service/torneo-service/torneo-service';
import { TranslocoPipe } from '@ngneat/transloco';
import { Lightbox, LightboxModule } from 'ngx-lightbox';

@Component({
  selector: 'app-list',
  imports: [CommonModule, RouterModule, TranslocoPipe, LightboxModule],
  templateUrl: './torneo-details.html',
  styleUrl: './torneo-details.css'
})
export class TorneoDetails implements OnInit{

  torneo: Torneo | undefined;
  id: number | null = null;

  todosEquipos: Equipo[] = [];
  filtrarEquipos: Equipo[] = [];


  constructor(private equipoService: EquipoService,
              private torneoService: TorneoService,
              private route: ActivatedRoute,
              private router: Router,
              private tituloService: Title,
              private location: Location,
              private lightbox: Lightbox
  ) {}

ngOnInit(): void {
  const rawId = this.route.snapshot.paramMap.get('id');
  this.id = rawId !== null ? Number(rawId) : null;

  if (this.id == null || Number.isNaN(this.id)) {
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
    if (this.id != null) {
      this.filtrarEquipos = this.todosEquipos.filter(
        (equipo) => equipo.idTorneo === this.id
      );
      console.log('Equipos filtrados:', this.filtrarEquipos);
    }
  }

    abrirImagen(url: string | null | undefined): void {
      if (!url) {
        console.error("No hay URL de imagen para mostrar.");
        return;
      }
    
      const album = [
        {
          src: url,
          caption: '',
          thumb: url
        }
      ];
    
      this.lightbox.open(album, 0);
    }


    goBack(): void {
    this.router.navigate(['es/torneos']);
  }

  
}
