import { Component, OnInit } from '@angular/core';
import Jugador from '../../../model/jugador';
import { JugadorService } from '../../../service/jugador-service/jugador-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import EstadisticaGoleador from '../../../model/estadistica-goleador';
import Equipo from '../../../model/equipo';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import { EstadisticaGoleadorService } from '../../../service/estadistica-goleador-service/estadistica-goleador-service';
import { TranslocoPipe } from '@ngneat/transloco';
import { CommonModule, Location } from '@angular/common';
import { Lightbox, LightboxModule } from 'ngx-lightbox';

@Component({
  selector: 'app-jugador-details',
  imports: [RouterModule, TranslocoPipe, CommonModule, LightboxModule],
  templateUrl: './jugador-details.html',
  styleUrl: './jugador-details.css'
})
export class JugadorDetails implements OnInit{
  
  jugador?: Jugador;
  estadisticaGoleador?: EstadisticaGoleador;
  equipoDelJugador?: Equipo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jugadorService: JugadorService,
    private equipoService: EquipoService,
    private estadisticaService: EstadisticaGoleadorService,
    private location: Location ,
    private lightbox: Lightbox
  ) { }


  ngOnInit(): void {
    const rawId = this.route.snapshot.paramMap.get('id');
    const jugadorIdNum = rawId !== null ? Number(rawId) : undefined;

    if (jugadorIdNum == null || Number.isNaN(jugadorIdNum)) {
      console.error('No se encontró ID de jugador');
      return;
    }

    this.getDatosDelJugador(jugadorIdNum);
    
    this.cargarEstadisticas(jugadorIdNum);
  }

  getDatosDelJugador(id: string | number): void {
    
    this.jugadorService.getJugadorById(id).subscribe(jugadorData => {
      this.jugador = jugadorData;

      if (this.jugador && this.jugador.idEquipo) {
        this.equipoService.getEquipoById(this.jugador.idEquipo).subscribe(equipoData => {
          this.equipoDelJugador = equipoData;
        });
      }
    });
  }

  cargarEstadisticas(jugadorId: number): void {
    // Primero obtenemos el jugador para saber su equipo y torneo, luego solicitamos estadísticas por torneo
    this.jugadorService.getJugadorById(jugadorId).subscribe(jugadorData => {
      if (jugadorData && jugadorData.idEquipo) {
        this.equipoService.getEquipoById(jugadorData.idEquipo).subscribe(equipoData => {
          if (equipoData && equipoData.idTorneo) {
            this.estadisticaService.getEstadisticaGoleador(equipoData.idTorneo).subscribe(lista => {
              this.estadisticaGoleador = lista.find(s => s.idJugador === jugadorId);
            });
          }
        });
      }
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
    this.router.navigate(['es/equipos/', this.jugador?.idEquipo]);
  }

}