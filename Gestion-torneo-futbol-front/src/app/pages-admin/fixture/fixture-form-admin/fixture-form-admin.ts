import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import Fixture from '../../../model/fixture';
import { FixtureService } from '../../../service/fixture-service/fixture-service';
import { EquipoService } from '../../../service/equipo-service/equipo-service';

@Component({
  selector: 'app-fixture-form',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslocoPipe],
  templateUrl: './fixture-form-admin.html',
  styleUrl: './fixture-form-admin.css',
})
export class FixtureFormAdmin implements OnInit{


  fixtureForm!: FormGroup;
  fixtureID?: string;; 
  equipoID?: string; 

  nombreEquipoLocal: string = 'Cargando...';
  nombreEquipoVisitante: string = 'Cargando...';

  constructor(
    private fb: FormBuilder,
    private fixtureService: FixtureService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private equipoService: EquipoService
  ) {}

  ngOnInit(): void {
  
    this.fixtureForm = this.fb.group({
      id: ['', Validators.required],
      equipoLocalID: ['', Validators.required],
      equipoVisitaID: ['', Validators.required],
      golesEquipo1: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      golesEquipo2: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      fechaPartido: ['', Validators.required],
      estadoPartido: ['', Validators.required] 
    });
    
    this.fixtureID = this.route.snapshot.params['id'];
  this.equipoID = this.route.snapshot.queryParamMap.get('equipoID') || undefined;

  if (this.fixtureID) {
    this.fixtureService.getFixtureById(this.fixtureID).subscribe(data => {
        
        let fechaFormateada: string | null = null;
        if (data.fechaPartido) {
          const fechaObj = new Date(data.fechaPartido);
          fechaFormateada = fechaObj.toISOString().slice(0, 16);
        }
        const datosParaFormulario = { 
          ...data,
          fechaPartido: fechaFormateada 
        };

        this.fixtureForm.patchValue(datosParaFormulario);

        this.buscarNombreEquipos(data.equipoLocalID, data.equipoVisitaID);
      });
  }
}

buscarNombreEquipos(localId: string, visitaId: string): void {
    this.equipoService.getEquipoById(localId).subscribe(equipo => {
      this.nombreEquipoLocal = equipo.nombre;
    });
    this.equipoService.getEquipoById(visitaId).subscribe(equipo => {
      this.nombreEquipoVisitante = equipo.nombre;
    });
  }

  onSubmit(): void {
    if (this.fixtureForm.invalid) return;
    const rutaDeVuelta = ['/fixture-detalles-admin', this.fixtureID];

    if (this.fixtureID) {
      const fixtureData: Fixture = { ...this.fixtureForm.value, id: this.fixtureID }; 

      this.fixtureService.updateFixture(fixtureData).subscribe({
        next: () => {
          this.router.navigate(rutaDeVuelta);
          alert("Fixture actualizado!");
        },
        error: () => {
          console.log(); 
          alert("Error al actualizar el fixture");
          this.router.navigate(rutaDeVuelta);
        } 
      });

    } else {
      console.error('Error: No se encontró fixtureID para actualizar.');
    }
  }

  goBack(): void {
    this.location.back();
  }

}
