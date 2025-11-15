import { Component, OnInit } from '@angular/core';
import Equipo from '../../../model/equipo';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Torneo from '../../../model/torneo';
import { TorneoService } from '../../../service/torneo-service/torneo-service';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-equipo-details',
  imports: [CommonModule, TranslocoPipe, RouterLink],
  templateUrl: './equipo-details-admin.html',
  styleUrl: './equipo-details-admin.css',
})
export class EquipoDetailsAdmin implements OnInit{

    torneoDelEquipo?: Torneo;
    equipo?: Equipo;

  constructor(
    private equipoService: EquipoService,
    private route: ActivatedRoute,
    private torneoService: TorneoService,
    private location: Location
  ) {}

  ngOnInit(): void {

    const equipoId = this.route.snapshot.params['id'];
    this.equipoService.getEquipoById(equipoId).subscribe(data => this.equipo = data);

    if (!equipoId) return;

    this.equipoService.getEquipoById(equipoId).subscribe(equipoData => {
      this.equipo = equipoData;

      if (equipoData && equipoData.idTorneo) {
        this.torneoService.getTorneoById(equipoData.idTorneo).subscribe(torneoData => {
          this.torneoDelEquipo = torneoData;
      });
      }
    });

    // this.dtService.getDtByEquipoId(equipoId).subscribe(dtData => { ... });
    // this.jugadorService.getJugadoresByEquipoId(equipoId).subscribe(jugadoresData => { ... });

  }


      goBack(): void {
    this.location.back();
  }


}


