import { Component, OnInit } from '@angular/core';
import Jugador from '../../../model/jugador';
import { JugadorService } from '../../../service/jugador-service/jugador-service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import EstadisticaGoleador from '../../../model/estadistica-goleador';
import Equipo from '../../../model/equipo';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import { EstadisticaGoleadorService } from '../../../service/estadistica-goleador-service/estadistica-goleador-service';
import { TranslocoPipe } from '@ngneat/transloco';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-jugador-details',
  imports: [RouterModule, TranslocoPipe, CommonModule],
  templateUrl: './jugador-details.html',
  styleUrl: './jugador-details.css'
})
export class JugadorDetails implements OnInit{
  
  jugador?: Jugador;
  estadisticaGoleador?: EstadisticaGoleador;
  equipoDelJugador?: Equipo;

  constructor(
    private route: ActivatedRoute,
    private jugadorService: JugadorService,
    private equipoService: EquipoService,
    private estadisticaService: EstadisticaGoleadorService,
    private location: Location 
  ) { }


  ngOnInit(): void {
    const jugadorId = this.route.snapshot.paramMap.get('id');

    if (!jugadorId) {
      console.error('No se encontró ID de jugador');
      return;
    }

    this.getDatosDelJugador(jugadorId);
    
    this.cargarEstadisticas(jugadorId);
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

  cargarEstadisticas(jugadorId: string): void {
    this.estadisticaService.getEstadisticaGoleadorById(jugadorId).subscribe(data => {
      this.estadisticaGoleador = data;
    });
  }

      goBack(): void {
    this.location.back();
  }

}