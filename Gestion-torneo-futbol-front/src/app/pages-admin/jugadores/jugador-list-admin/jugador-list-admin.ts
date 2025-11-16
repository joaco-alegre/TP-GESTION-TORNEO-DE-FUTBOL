import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import Jugador from '../../../model/jugador';
import { JugadorService } from '../../../service/jugador-service/jugador-service';
import DT from '../../../model/dt';
import { DtService } from '../../../service/dt-service/dt-service';
import { TranslocoPipe } from '@ngneat/transloco';
import Fixture from '../../../model/fixture';
import Equipo from '../../../model/equipo';
import { FixtureService } from '../../../service/fixture-service/fixture-service';
import { EquipoService } from '../../../service/equipo-service/equipo-service';

@Component({
  selector: 'app-jugador-list',
  imports: [RouterModule, CommonModule, TranslocoPipe],
  templateUrl: './jugador-list-admin.html',
  styleUrl: './jugador-list-admin.css',
})
export class JugadorListAdmin implements OnInit{

  dt?: DT;
  jugadores: Jugador[] = [];
  todosJugadores: Jugador[] = [];
  todosDts: DT[] = [];
  fixtures: Fixture[] = [];
  private todosFixtures: Fixture[] = []; 
  private todosEquipos: Equipo[] = [];
  equipoNombre?: string;

  equipoId: number | null = null;
  
    constructor(private jugadorService: JugadorService,
                private dtService: DtService,
                private route: ActivatedRoute,
                private location: Location,
                private fixtureService: FixtureService,
                private equipoService: EquipoService
    ) {}
  
    ngOnInit(): void {
      
      const rawId = this.route.snapshot.paramMap.get('id');
      this.equipoId = rawId !== null ? Number(rawId) : null;

    if (this.equipoId == null || Number.isNaN(this.equipoId)) {
      console.error('No se encontró ID de equipo en la URL');
      return;
    }

      this.equipoService.getEquipoById(this.equipoId).subscribe(equipoData => {
      this.equipoNombre = equipoData.nombre;
    });

    this.cargarJugadores();
    this.cargarDts();
    this.cargarFixtures();
    this.cargarEquipos();
    
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

  cargarFixtures(): void {
    this.fixtureService.getFixtures().subscribe(data => {
      this.todosFixtures = data;
      this.filtrarFixturesPorEquipo();
    });
  }

  cargarEquipos(): void {
    this.equipoService.getEquipos().subscribe(data => {
      this.todosEquipos = data;
    });
  }

  filtrarFixturesPorEquipo(): void {
    if (this.equipoId) {
      this.fixtures = this.todosFixtures.filter(
        (fixture) => fixture.equipoLocalID === this.equipoId || fixture.equipoVisitaID === this.equipoId
      );
    }
  }

  getEscudo(equipoID: number): string {
    const equipo = this.todosEquipos.find(e => e.id === equipoID);
    return equipo?.escudo || 'assets/icons/icono.png'; 
  }
  
  deleteJugador(id: number): void {
    if (!confirm("¿Estás seguro de que deseas eliminar este jugador?")) {
      return;
    }
  
  this.jugadorService.deleteJugador(id).subscribe(() => {
      const index = this.todosJugadores.findIndex(j => j.id === id);
      if (index > -1) {
        this.todosJugadores.splice(index, 1);
      }
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
      equipoID: undefined
    } as DT;

    this.dtService.updateDt(dtActualizado).subscribe(() => {
      const index = this.todosDts.findIndex(d => d.id === dt.id);
      if (index > -1) {
        this.todosDts[index].equipoID = undefined; 
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

