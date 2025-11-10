import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import Jugador from '../../../model/jugador';
import { JugadorService } from '../../../service/jugador-service/jugador-service';
import DT from '../../../model/dt';
import { DtService } from '../../../service/dt-service/dt-service';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-jugador-list',
  imports: [RouterModule, CommonModule, TranslocoPipe],
  templateUrl: './jugador-list-admin.html',
  styleUrl: './jugador-list-admin.css',
})
export class JugadorListAdmin implements OnInit{

  dt?: DT;
  jugadores: Jugador[] = [];

  private todosJugadores: Jugador[] = [];
  private todosDts: DT[] = [];

  private equipoId: string | null = null;
  
    constructor(private jugadorService: JugadorService,
                private dtService: DtService,
                private route: ActivatedRoute,
                private location: Location
    ) {}
  
    ngOnInit(): void {
      
      this.equipoId = this.route.snapshot.paramMap.get('id');

    if (!this.equipoId) {
      console.error('No se encontró ID de equipo en la URL');
      return;
    }

    this.cargarJugadores();
    this.cargarDts();
    
  }
    
    cargarJugadores(): void {
    this.jugadorService.getJugadores().subscribe(data => {
      this.todosJugadores = data;
      this.filtrarJugadoresPorEquipo(); 
    });
  }

    cargarDts(): void {
    this.dtService.getDTs().subscribe(data => {
      this.todosDts = data; 
      this.filtrarDtPorEquipo(); 
    });
  }

  filtrarJugadoresPorEquipo(): void {
    if (this.equipoId) {
      this.jugadores = this.todosJugadores.filter(
        (jugador) => jugador.idEquipo === this.equipoId 
      );
    }
  }

  filtrarDtPorEquipo(): void {
    if (this.equipoId) {
      this.dt = this.todosDts.find(
        (dt) => dt.equipoID === this.equipoId
      );
    }
  }
  
  deleteJugador(id: string): void {
    if (!confirm("¿Estás seguro de que deseas eliminar este jugador?")) {
      return;
    }
  
  this.jugadorService.deleteJugador(id).subscribe(() => {
      // 1. Elimina de la lista completa
      const index = this.todosJugadores.findIndex(j => j.id === id);
      if (index > -1) {
        this.todosJugadores.splice(index, 1);
      }
      
      // 2. Vuelve a filtrar (esto actualiza la vista)
      this.filtrarJugadoresPorEquipo();
      
      alert("Jugador eliminado");
    });
  }


sacarDt(dt: DT): void {
    
    if (!confirm(`¿Estás seguro de que deseas sacar a ${dt.nombre} de este equipo?`)) {
      return;
    }
    const dtActualizado = { 
      ...dt, 
      equipoID: '' 
    };

    this.dtService.updateDt(dtActualizado).subscribe(() => {
      const index = this.todosDts.findIndex(d => d.id === dt.id);
      if (index > -1) {
        this.todosDts[index].equipoID = ''; 
      }
      this.filtrarDtPorEquipo();   
      alert("DT desvinculado del equipo");

    }, (error) => {
      console.error("Error al desvincular al DT:", error);
      alert("No se pudo sacar al DT del equipo.");
    });
  }

      
  
    goBack(): void {
    this.location.back();
  }
}

