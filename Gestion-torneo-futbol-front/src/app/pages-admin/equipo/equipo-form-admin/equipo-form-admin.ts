import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import { ActivatedRoute, Router } from '@angular/router';
import Equipo from '../../../model/equipo';
import { TorneoService } from '../../../service/torneo-service/torneo-service';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-equipo-form',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, TranslocoPipe],
  templateUrl: './equipo-form-admin.html',
  styleUrl: './equipo-form-admin.css',
})
export class EquipoFormAdmin implements OnInit{

  equipoForm!: FormGroup;
  equipoID?: string;
  torneoID?: string;

  equipo: Equipo | undefined;

  constructor(
    private fb: FormBuilder,
    private equipoService: EquipoService,
    private torneoService: TorneoService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
  
    this.equipoForm = this.fb.group({
      
      id: ['', []],
      nombre: ['', Validators.required],
      escudo: ['', [Validators.required]],
      idTorneo: ['', [Validators.required]]
    });

this.equipoID = this.route.snapshot.params['id'];

    if (this.equipoID) {

      this.equipoService.getEquipoById(this.equipoID)
        .subscribe(data => {
          const datosParaFormulario = { ...data };
          this.equipoForm.patchValue(datosParaFormulario);
          this.torneoID = data.idTorneo;
        });

    }else{

    this.torneoID = this.route.snapshot.queryParamMap.get('idTorneo') || undefined;

    if (this.torneoID) {
      this.equipoForm.patchValue({ idTorneo: this.torneoID });

    }
  }    

}



    onSubmit(): void {

if (this.equipoForm.invalid) {
      this.equipoForm.markAllAsTouched();
      return;
    }

const idTorneoParaNavegar = this.equipoForm.value.idTorneo;

    if (this.equipoID) {

      const equipoData: Equipo = { id: this.equipoID, ...this.equipoForm.value }; 

      this.equipoService.updateEquipo(equipoData).subscribe({
        next: () => {this.router.navigate(['/equipo-details-admin', this.equipoID]),
            alert("Equipo actualizado!")},
        error: (e) => {console.log(e), 
            alert("error al actualizar el equipo"),
            this.router.navigate(['/equipo-admin/', idTorneoParaNavegar])
        } });

    } else {

      const equipoData = this.equipoForm.value;
      
      delete equipoData.id;
      
      this.equipoService.postEquipo(equipoData).subscribe({
        next: () => {this.router.navigate(['/equipo-admin/', idTorneoParaNavegar]); 
          alert("Equipo agregado!")},
        error: (e) => {console.log(e), 
            alert("error al cargar el equipo"),
            this.router.navigate(['/equipo-admin/', idTorneoParaNavegar])
        } });
    }
}

goBack(): void {
    
    if (this.equipoID && this.equipo) {
        this.router.navigate(['/equipo-details-admin', this.equipoID]);
        return;
    } 
    
    else if (this.torneoID) {
        this.router.navigate(['/equipo-admin', this.torneoID]);
        return;
    }
    
    this.router.navigate(['/torneos-admin']); 
  }




}


