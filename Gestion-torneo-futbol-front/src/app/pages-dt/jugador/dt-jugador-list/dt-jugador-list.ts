import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import Jugador from '../../../model/jugador';
import { DtService } from '../../../service/dt-service/dt-service';
import { JugadorService } from '../../../service/jugador-service/jugador-service';
import { Lightbox, LightboxModule } from 'ngx-lightbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dt-jugador-list',
  imports: [CommonModule, RouterModule, TranslocoPipe, LightboxModule],
  templateUrl: './dt-jugador-list.html',
  styleUrl: './dt-jugador-list.css',
})
export class DtJugadorList {

  jugadoresLibres: Jugador[] = [];
  dtEquipoId?: string;
  
  todosJugadores: Jugador[] = [];

      currentUserId: string | null = null;
      private querySub: Subscription | undefined;

  constructor(
    private dtService: DtService,
    private jugadorService: JugadorService,
    private router: Router,
    private location: Location,
    private lightbox: Lightbox,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

  this.querySub = this.route.queryParamMap.subscribe(params => {
        const idFromQuery = params.get('referrerId'); 
        
        if (idFromQuery) {
            this.currentUserId = idFromQuery;
            console.log('ID del usuario logueado recibido por Query Param:', this.currentUserId);
        }
    });

    if(this.currentUserId){

    this.dtService.geDtById(this.currentUserId).subscribe({
      next: (dtData) => {
        if (dtData && dtData.equipoID && dtData.equipoID.trim() !== '') {
          this.dtEquipoId = dtData.equipoID;
          this.cargarJugadores(); 
        } else {
          alert("No estás asignado a ningún equipo. No puedes fichar jugadores.");
          this.router.navigate(['/es']); 
        }
      },
      error: (err) => {
        alert("Error: Tu ID de DT no es válido.");
        this.router.navigate(['/es/inicio-sesion']);
      }
    });
  }

}





  cargarJugadores(): void {
    this.jugadorService.getJugadores().subscribe(data => {
      this.todosJugadores = data;
      this.filtrarJugadoresLibres();
    });
  }

  filtrarJugadoresLibres(): void {
    this.jugadoresLibres = this.todosJugadores.filter(
      (jugador) => !jugador.idEquipo || jugador.idEquipo.trim() === ''
    );
  }

  agregarAlEquipo(jugador: Jugador): void {
    
    if (!this.dtEquipoId) return; 

    if (!confirm(`¿Estás seguro de que deseas agregar a ${jugador.nombre} a tu equipo?`)) {
      return;
    }

    const jugadorActualizado: Jugador = {
      ...jugador,
      idEquipo: this.dtEquipoId 
    };

    this.jugadorService.updateJugador(jugadorActualizado).subscribe(() => {
      
      const index = this.todosJugadores.findIndex(j => j.id === jugador.id);
      if (index > -1) {
        this.todosJugadores[index].idEquipo = this.dtEquipoId!;
      }
      
      this.filtrarJugadoresLibres();
      
      alert(`${jugador.nombre} ha sido agregado a tu equipo.`);

    }, (error) => {
      console.error("Error al agregar al jugador:", error);
      alert("No se pudo agregar al jugador al equipo.");
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
    
      this.lightbox.open(album,0);
}

            goBack(): void {
      this.location.back();
    }


}
