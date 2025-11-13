import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Jugador from '../../../model/jugador';
import { DtService } from '../../../service/dt-service/dt-service';
import { JugadorService } from '../../../service/jugador-service/jugador-service';
import Equipo from '../../../model/equipo';
import { EquipoService } from '../../../service/equipo-service/equipo-service';

@Component({
  selector: 'app-dt-equipo-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './dt-equipo-details.html',
  styleUrl: './dt-equipo-details.css',
})
export class DtEquipoDetails implements OnInit{

  jugadores: Jugador[] = [];
  equipoId?: string ;
  equipoActual?: Equipo;
  todosJugadores: Jugador[] = [];

  constructor(
    private dtService: DtService,
    private jugadorService: JugadorService,
    private router: Router,
    private equipoService: EquipoService
  ) {}

  ngOnInit(): void {

    const loggedInDtId = 'dt-mg-001'; 

   this.dtService.geDtById(loggedInDtId).subscribe({
      next: (dtData) => {
        if (dtData && dtData.equipoID && dtData.equipoID.trim() !== '') {
          this.equipoId = dtData.equipoID;
          
          this.equipoService.getEquipoById(this.equipoId).subscribe(dataEquipo => {
            this.equipoActual = dataEquipo;
          });
          this.cargarJugadores();

        } else {
          alert("No estás asignado a ningún equipo.");
          this.router.navigate(['/es']);
        }
      },
      error: (err) => {
        alert("Error: Tu ID de DT no es válido.");
        this.router.navigate(['/es/inicio-sesion']);
      }
    });
  }
  


  cargarJugadores(): void {
    this.jugadorService.getJugadores().subscribe(data => {
      this.todosJugadores = data;
      this.filtrarJugadoresPorEquipo();
    });
  }


  filtrarJugadoresPorEquipo(): void {
    if (this.equipoId) {
      this.jugadores = this.todosJugadores.filter(
        (jugador) => jugador.idEquipo === this.equipoId 
      );
    }
  }

  sacarJugador(jugador: Jugador): void {
    
    if (!this.equipoId) return; 

    if (!confirm(`¿Estás seguro de que deseas sacar a ${jugador.nombre} del equipo?`)) {
      return;
    }

    const jugadorActualizado: Jugador = {
      ...jugador,
      idEquipo: '' 
    };

    this.jugadorService.updateJugador(jugadorActualizado).subscribe(() => {
      
      const index = this.todosJugadores.findIndex(j => j.id === jugador.id);
      if (index > -1) {
        this.todosJugadores[index].idEquipo = ''; 
      }
      
      this.filtrarJugadoresPorEquipo();
      
      alert(`${jugador.nombre} ha quedado libre.`);

    }, (error) => {
      console.error("Error al sacar al jugador:", error);
      alert("No se pudo sacar al jugador del equipo.");
    });
  }
}
