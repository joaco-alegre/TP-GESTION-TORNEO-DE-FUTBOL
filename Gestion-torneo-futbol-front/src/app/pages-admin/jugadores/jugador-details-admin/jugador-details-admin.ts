import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JugadorService } from '../../../service/jugador-service/jugador-service';
import Jugador from '../../../model/jugador';
import { TranslocoPipe } from '@ngneat/transloco';
import EstadisticaGoleador from '../../../model/estadistica-goleador';
import Equipo from '../../../model/equipo';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import { EstadisticaGoleadorService } from '../../../service/estadistica-goleador-service/estadistica-goleador-service';

@Component({
  selector: 'app-jugador-details',
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './jugador-details-admin.html',
  styleUrl: './jugador-details-admin.css',
})
export class JugadorDetailsAdmin {

    jugador?: Jugador;
    estadisticaGoleador?: EstadisticaGoleador;
    equipoDelJugador?: Equipo;

  constructor(
    private jugadorService: JugadorService,
    private route: ActivatedRoute,
    private location: Location,
    private equipoService: EquipoService,
    private estadisticaService:EstadisticaGoleadorService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.jugadorService.getJugadorById(id).subscribe(data => this.jugador = data);


    this.getDatosDelJugador(id);
    
    this.cargarEstadisticas(id);
  }

    getDatosDelJugador(id: number): void {
    
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

        goBack(): void {
    this.location.back();
  }


}
