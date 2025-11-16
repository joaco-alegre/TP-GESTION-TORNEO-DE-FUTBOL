import { Component, OnInit } from '@angular/core';
import Jugador from '../../../model/jugador';
import EstadisticaGoleador from '../../../model/estadistica-goleador';
import Equipo from '../../../model/equipo';
import { JugadorService } from '../../../service/jugador-service/jugador-service';
import { ActivatedRoute } from '@angular/router';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import { EstadisticaGoleadorService } from '../../../service/estadistica-goleador-service/estadistica-goleador-service';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-dt-jugador-details',
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './dt-jugador-details.html',
  styleUrl: './dt-jugador-details.css',
})
export class DtJugadorDetails implements OnInit{

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
      const rawId = this.route.snapshot.params['id'];
      const idNum = rawId !== undefined && rawId !== null ? Number(rawId) : undefined;
      if (idNum == null || Number.isNaN(idNum)) return;
      this.jugadorService.getJugadorById(idNum).subscribe(data => this.jugador = data);

      this.getDatosDelJugador(idNum);
      
      this.cargarEstadisticas(idNum);
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
      this.estadisticaService.getEstadisticaGoleadorByIdJugador(jugadorId).subscribe(data => {
        this.estadisticaGoleador = data;
      });
    }
  
          goBack(): void {
      this.location.back();
    }
  

}
