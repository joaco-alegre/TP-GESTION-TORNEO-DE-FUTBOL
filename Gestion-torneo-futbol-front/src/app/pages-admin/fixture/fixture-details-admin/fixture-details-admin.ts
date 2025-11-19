import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Fixture from '../../../model/fixture';
import Equipo from '../../../model/equipo';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FixtureService } from '../../../service/fixture-service/fixture-service';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-fixture-details',
  imports: [CommonModule, TranslocoPipe, RouterModule],
  templateUrl: './fixture-details-admin.html',
  styleUrl: './fixture-details-admin.css',
})
export class FixtureDetailsAdmin implements OnInit{

    fixture?: Fixture;
    equipoLocal?: Equipo;
    equipoVisitante?: Equipo;
    equipoID?: string | null = null;
    returnUrl: string = '/usuario-home';
  
    constructor(
      private route: ActivatedRoute, 
      private fixtureService: FixtureService,
      private equipoService: EquipoService,
      private location: Location,
      private router: Router
    ) { }
  
    ngOnInit(): void {

      this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || 'admin/usuario-home';
      
      const fixtureId = this.route.snapshot.paramMap.get('id');

      this.equipoID = this.route.snapshot.queryParamMap.get('equipoID');

      if (fixtureId) {

      this.getDatosDelFixture(fixtureId);

    } else {
      console.error('No se encontró ID de fixture');
    }

    }
  
    getDatosDelFixture(fixtureId: string): void {
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
      this.router.navigateByUrl(this.returnUrl);
    }

}
