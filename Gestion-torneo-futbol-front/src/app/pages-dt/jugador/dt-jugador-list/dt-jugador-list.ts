import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import Jugador from '../../../model/jugador';
import { DtService } from '../../../service/dt-service/dt-service';
import { JugadorService } from '../../../service/jugador-service/jugador-service';

@Component({
  selector: 'app-dt-jugador-list',
  imports: [CommonModule, RouterModule, TranslocoPipe],
  templateUrl: './dt-jugador-list.html',
  styleUrl: './dt-jugador-list.css',
})
export class DtJugadorList {

  jugadoresLibres: Jugador[] = [];
  dtEquipoId?: number; 
  
  todosJugadores: Jugador[] = [];

  constructor(
    private dtService: DtService,
    private jugadorService: JugadorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const loggedInDtId = 'dt-mg-001'; 

    this.dtService.geDtById(loggedInDtId).subscribe({
      next: (dtData) => {
        if (dtData && dtData.equipoID != null && dtData.equipoID !== 0) {
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

  cargarJugadores(): void {
    this.jugadorService.getJugadores().subscribe(data => {
      this.todosJugadores = data;
      this.filtrarJugadoresLibres();
    });
  }

  filtrarJugadoresLibres(): void {
    this.jugadoresLibres = this.todosJugadores.filter(
      (jugador) => jugador.idEquipo == null || jugador.idEquipo === 0
    );
  }

  agregarAlEquipo(jugador: Jugador): void {
    
    if (this.dtEquipoId == null) return; 

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


}
