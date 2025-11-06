import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { FixtureService } from '../../../service/fixture-service/fixture-service';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import Equipo from '../../../model/equipo';
import Fixture from '../../../model/fixture';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-fixture-details',
  imports: [CommonModule, RouterModule, TranslocoPipe],
  templateUrl: './fixture-details.html',
  styleUrl: './fixture-details.css'
})
export class FixtureDetails implements OnInit{

  fixture?: Fixture;
  equipoLocal?: Equipo;
  equipoVisitante?: Equipo;

  constructor(
    private route: ActivatedRoute, 
    private fixtureService: FixtureService,
    private equipoService: EquipoService,
    private location: Location 
  ) { }

  ngOnInit(): void {
    this.getDatosDelFixture();
  }

  getDatosDelFixture(): void {

    const fixtureId = this.route.snapshot.paramMap.get('id');

    if (!fixtureId) {
      console.error('No se encontró ID de fixture');
      return;
    }

    this.fixtureService.getFixtureById(fixtureId).subscribe(fixtureData => {
      this.fixture = fixtureData;

      this.equipoService.getEquipoById(fixtureData.equipoLocalID).subscribe(localData => {
        this.equipoLocal = localData;
      });
      
      this.equipoService.getEquipoById(fixtureData.equipoVisitaID).subscribe(visitanteData => {
        this.equipoVisitante = visitanteData;
      });
    });
  }

    goBack(): void {
    this.location.back();
  }

}
