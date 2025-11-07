import { Component, OnInit } from '@angular/core';
import Equipo from '../../../model/equipo';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { DtService } from '../../../service/dt-service/dt-service';
import { JugadorService } from '../../../service/jugador-service/jugador-service';
import { FixtureService } from '../../../service/fixture-service/fixture-service';
import { Title } from '@angular/platform-browser';
import Jugador from '../../../model/jugador';
import Fixture from '../../../model/fixture';
import DT from '../../../model/dt';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-details',
  imports: [CommonModule, RouterModule, TranslocoPipe],
  templateUrl: './equipo-details.html',
  styleUrl: './equipo-details.css'
})
export class EquipoDetails implements OnInit{

  equipo: Equipo | undefined;
  dt: DT | undefined;
  filtrarJugadores: Jugador[] = [];
  fixtures: Fixture[] = [];

  id: string | null = null; 

  private todosDts: DT[] = [];
  private todosJugadores: Jugador[] = [];
  private todosFixtures: Fixture[] = [];
  private todosEquipos: Equipo[] = [];

  constructor(
    private route: ActivatedRoute,
    private equipoService: EquipoService,
    private dtService: DtService,
    private jugadorService: JugadorService,
    private fixtureService: FixtureService, 
    private tituloService: Title,
    private location: Location 
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

    if (!this.id) {
      console.error('No se encontró ID de equipo en la URL');
      this.tituloService.setTitle('Equipo no encontrado');
      return;
    }

    console.log('ID del equipo recibido:', this.id);

    this.equipoService.getEquipoById(this.id).subscribe(equipoEncontrado => {
      this.equipo = equipoEncontrado;
      if (equipoEncontrado) {
        this.tituloService.setTitle(equipoEncontrado.nombre);
      } else {
        this.tituloService.setTitle('Equipo no encontrado');
      }
    });

    this.dtService.getDTs().subscribe(data => { 
      this.todosDts = data;
      this.filtrarDtPorEquipo();
    });

    this.jugadorService.getJugadores().subscribe(data => { 
      this.todosJugadores = data;
      this.filtrarJugadoresPorEquipo();
    });

    this.fixtureService.getFixtures().subscribe(data => { 
      this.todosFixtures = data;
      this.filtrarFixturesPorEquipo();
    });

    this.equipoService.getEquipos().subscribe((data: Equipo[]) => {
      this.todosEquipos = data;
    });

  }

  filtrarDtPorEquipo(): void {

    if (this.id) {
      this.dt = this.todosDts.find(
        (dt) => dt.equipoID === this.id
      );
      if (!this.dt) {
        console.warn('No se encontró DT para este equipo.');
      }
    }
  }

  filtrarJugadoresPorEquipo(): void {
    if (this.id) {
      this.filtrarJugadores = this.todosJugadores.filter(
        (jugador) => jugador.idEquipo === this.id 
      );
    }
  }

  
  filtrarFixturesPorEquipo(): void {
    if (this.id) {
      this.fixtures = this.todosFixtures.filter(
        (fixture) => fixture.equipoLocalID === this.id || fixture.equipoVisitaID === this.id 
      );
    }
  }

getEscudo(equipoID: string): string {
  const equipo = this.todosEquipos.find(data => equipoID === data.id);
  
  if (equipo && equipo.escudo) {
    return equipo.escudo;
  }
  return 'assets/icons/icono.png'; 
}

    goBack(): void {
    this.location.back();
  }

}






