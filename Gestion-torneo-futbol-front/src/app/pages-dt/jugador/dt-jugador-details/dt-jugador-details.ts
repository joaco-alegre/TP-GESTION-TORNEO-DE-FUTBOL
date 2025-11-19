import { Component, OnInit } from '@angular/core';
import Jugador from '../../../model/jugador';
import EstadisticaGoleador from '../../../model/estadistica-goleador';
import Equipo from '../../../model/equipo';
import { JugadorService } from '../../../service/jugador-service/jugador-service';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import { EstadisticaGoleadorService } from '../../../service/estadistica-goleador-service/estadistica-goleador-service';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { Lightbox, LightboxModule } from 'ngx-lightbox';

@Component({
  selector: 'app-dt-jugador-details',
  imports: [CommonModule, TranslocoPipe, LightboxModule],
  templateUrl: './dt-jugador-details.html',
  styleUrl: './dt-jugador-details.css',
})
export class DtJugadorDetails implements OnInit{

    jugador?: Jugador;
      estadisticaGoleador?: EstadisticaGoleador;
      equipoDelJugador?: Equipo;
      returnUrl: string = '/dt-home';
  
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

      this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dt-home';
  
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
      this.router.navigateByUrl(this.returnUrl);
    }
  

}
