import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JugadorService } from '../../../service/jugador-service/jugador-service';
import Jugador from '../../../model/jugador';
import { TranslocoPipe } from '@ngneat/transloco';
import EstadisticaGoleador from '../../../model/estadistica-goleador';
import Equipo from '../../../model/equipo';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import { EstadisticaGoleadorService } from '../../../service/estadistica-goleador-service/estadistica-goleador-service';
import { Lightbox, LightboxModule } from 'ngx-lightbox';

@Component({
  selector: 'app-jugador-details',
  imports: [CommonModule, TranslocoPipe, RouterLink, LightboxModule],
  templateUrl: './jugador-details-admin.html',
  styleUrl: './jugador-details-admin.css',
})
export class JugadorDetailsAdmin {

    jugador?: Jugador;
    jugadres: Jugador[] = [];
    estadisticaGoleador?: EstadisticaGoleador;
    equipoDelJugador?: Equipo;
    todosJugadores: Jugador[] = [];
    equipoId?: string;
    returnUrl: string = '/admin/usuario-home';

  constructor(
    private jugadorService: JugadorService,
    private route: ActivatedRoute,
    private location: Location,
    private equipoService: EquipoService,
    private estadisticaService:EstadisticaGoleadorService,
    private lightbox: Lightbox,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.jugadorService.getJugadorById(id).subscribe(data => this.jugador = data);

    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/admin/usuario-home';

    this.getDatosDelJugador(id);
    
    this.cargarEstadisticas(id);
  }

    getDatosDelJugador(id: string): void {
    
    this.jugadorService.getJugadorById(id).subscribe(jugadorData => {
      this.jugador = jugadorData;

      if (this.jugador && this.jugador.idEquipo) {
        this.equipoService.getEquipoById(this.jugador.idEquipo).subscribe(equipoData => {
          this.equipoDelJugador = equipoData;
        });
      }
    });
  }

    deleteJugador(id: string): void {
    if (!confirm("¿Estás seguro de que deseas eliminar este jugador?")) {
      return;
    }
  
  this.jugadorService.deleteJugador(id).subscribe(() => {
      const index = this.todosJugadores.findIndex(j => j.id === id);
      if (index > -1) {
        this.todosJugadores.splice(index, 1);
      }   
      alert("Jugador eliminado");
    });
  }


    cargarEstadisticas(jugadorId: string): void {
    this.estadisticaService.getEstadisticaGoleadorById(jugadorId).subscribe(data => {
      this.estadisticaGoleador = data;
    });
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
    this.location.back();
  }


}
