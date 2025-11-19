import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import Jugador from '../../../model/jugador';
import { JugadorService } from '../../../service/jugador-service/jugador-service';
import DT from '../../../model/dt';
import { DtService } from '../../../service/dt-service/dt-service';
import { TranslocoPipe } from '@ngneat/transloco';
import Fixture from '../../../model/fixture';
import Equipo from '../../../model/equipo';
import { FixtureService } from '../../../service/fixture-service/fixture-service';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import { Lightbox, LightboxModule } from 'ngx-lightbox';

@Component({
  selector: 'app-jugador-list',
  imports: [RouterModule, CommonModule, TranslocoPipe, LightboxModule],
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
  equipoNombre: string | undefined;
  equipo?: Equipo;

  torneoId: string | null = null;
  returnUrl?: string;
  equipoId: string | null = null;
  
    constructor(private jugadorService: JugadorService,
                private dtService: DtService,
                private route: ActivatedRoute,
                private router: Router,
                private location: Location,
                private fixtureService: FixtureService,
                private equipoService: EquipoService,
                private lightbox: Lightbox
    ) {}
  
    ngOnInit(): void {
      
      this.equipoId = this.route.snapshot.paramMap.get('id');
      this.torneoId = this.route.snapshot.queryParamMap.get('torneoId');

    if (!this.equipoId) {
      console.error('No se encontró ID de equipo en la URL');
      return;
    }

      this.equipoService.getEquipoById(this.equipoId).subscribe(equipoData => {
      this.equipo = equipoData;
      this.equipoNombre = equipoData.nombre;

      if (!this.torneoId) {
            this.torneoId = equipoData.idTorneo;
          }
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

  getEscudo(equipoID: string): string {
    const equipo = this.todosEquipos.find(e => e.id === equipoID);
    return equipo?.escudo || 'assets/icons/icono.png'; 
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
    if (this.torneoId) {
      this.router.navigate(['/equipo-admin', this.torneoId]);
    } else {
      this.router.navigate(['/torneos-admin']);
    }
  }
}

