import { Component, OnInit } from '@angular/core';
import Equipo from '../../../model/equipo';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { DtService } from '../../../service/dt-service/dt-service';
import { JugadorService } from '../../../service/jugador-service/jugador-service';
import { FixtureService } from '../../../service/fixture-service/fixture-service';
import { Title } from '@angular/platform-browser';
import Jugador from '../../../model/jugador';
import Fixture from '../../../model/fixture';
import DT from '../../../model/dt';
import { TranslocoPipe } from '@ngneat/transloco';
import { TorneoService } from '../../../service/torneo-service/torneo-service';
import Torneo from '../../../model/torneo';
import { Lightbox, LightboxModule } from 'ngx-lightbox';

@Component({
  selector: 'app-details',
  imports: [CommonModule, RouterModule, TranslocoPipe, LightboxModule],
  templateUrl: './equipo-details.html',
  styleUrl: './equipo-details.css'
})
export class EquipoDetails implements OnInit{

  equipo: Equipo | undefined;
  dt: DT | undefined;
  filtrarJugadores: Jugador[] = [];
  fixtures: Fixture[] = [];

  id: number | null = null; 

  private todosDts: DT[] = [];
  private todosJugadores: Jugador[] = [];
  private todosFixtures: Fixture[] = [];
  private todosEquipos: Equipo[] = [];
  private todosTorneos: Torneo[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private equipoService: EquipoService,
    private dtService: DtService,
    private torneoService: TorneoService,
    private jugadorService: JugadorService,
    private fixtureService: FixtureService, 
    private tituloService: Title,
    private location: Location ,
    private lightbox: Lightbox
  ) { }

  ngOnInit(): void {

    const rawId = this.route.snapshot.paramMap.get('id');
    this.id = rawId !== null ? Number(rawId) : null;

    if (this.id == null || Number.isNaN(this.id)) {
      console.error('No se encontró ID de equipo en la URL');
      this.tituloService.setTitle('Equipo no encontrado');
      return;
    }

    console.log('ID del equipo recibido:', this.id);

    this.equipoService.getEquipoById(this.id).subscribe(equipoEncontrado => {
      this.equipo = equipoEncontrado;
      if (equipoEncontrado) {
        this.tituloService.setTitle(equipoEncontrado.nombre);
        // fetch fixtures for the equipo's tournament
        if (equipoEncontrado.idTorneo) {
          this.fixtureService.getFixtures(equipoEncontrado.idTorneo).subscribe(data => {
            this.todosFixtures = data;
            this.filtrarFixturesPorEquipo();
          });
        }
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

    // fixture fetching moved to happen after equipo is loaded (so we know idTorneo)

    this.equipoService.getEquipos().subscribe((data: Equipo[]) => {
      this.todosEquipos = data;
    });

    this.torneoService.getTorneos().subscribe((data: Torneo[]) => {
      this.todosTorneos = data;
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
    if (this.id != null) {
      this.filtrarJugadores = this.todosJugadores.filter(
        (jugador) => jugador.idEquipo === this.id 
      );
    }
  }

  
  filtrarFixturesPorEquipo(): void {
    if (this.id != null) {
      this.fixtures = this.todosFixtures.filter(
        (fixture) => fixture.equipoLocalID === this.id || fixture.equipoVisitaID === this.id 
      );
    }
  }

getEscudo(equipoID: number): string {
  const equipo = this.todosEquipos.find(data => equipoID === data.id);
  
  if (equipo && equipo.escudo) {
    return equipo.escudo;
  }
  return 'assets/icons/icono.png'; 
}

getNombreTorneo(idTorneo: number): string {

    const torneo = this.todosTorneos.find(t => t.id === idTorneo);
    if (torneo) {
      return torneo.nombre;
    }
    return 'Torneo no especificado';
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
    this.router.navigate(['es/torneos/', this.equipo?.idTorneo]);
  }

}






