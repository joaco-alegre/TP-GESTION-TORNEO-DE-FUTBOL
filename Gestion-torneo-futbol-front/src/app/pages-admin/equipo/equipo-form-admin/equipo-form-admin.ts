import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import { ActivatedRoute, Router } from '@angular/router';
import Equipo from '../../../model/equipo';
import { TorneoService } from '../../../service/torneo-service/torneo-service';

@Component({
  selector: 'app-equipo-form',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './equipo-form-admin.html',
  styleUrl: './equipo-form-admin.css',
})
export class EquipoFormAdmin implements OnInit{

  equipoForm!: FormGroup;
  equipoID?: string;
  torneoID?: string;

  constructor(
    private fb: FormBuilder,
    private equipoService: EquipoService,
    private torneoService: TorneoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  
    this.equipoForm = this.fb.group({
      
      id: ['', []],
      nombre: ['', Validators.required],
      escudo: ['', []],
      idTorneo: ['', []]
    });

this.equipoID = this.route.snapshot.params['id'];
    if (this.equipoID) {
      this.equipoService.getEquipoById(this.equipoID)
        .subscribe(data => {
          const datosParaFormulario = { ...data };
          this.equipoForm.patchValue(datosParaFormulario);
        });

this.torneoID = this.route.snapshot.params['idTorneo'];
    if (this.torneoID) {
      this.torneoService.getTorneoById(this.torneoID)
        .subscribe(data => {
          const datosParaFormulario = { ...data };
          this.equipoForm.patchValue(datosParaFormulario);
        })}    

      }
  }




    onSubmit(): void {

if (this.equipoForm.invalid) return;

    if (this.equipoID) {

      const equipoData: Equipo = { id: this.equipoID, ...this.equipoForm.value }; 

      this.equipoService.updateEquipo(equipoData).subscribe({
        next: () => {this.router.navigate(['/equipo-admin/', this.equipoID]),
            alert("Equipo actualizado!")},
        error: (e) => {console.log(e), 
            alert("error al actualizar el equipo"),
            this.router.navigate(['/equipo-admin/', this.torneoID])
        } });

    } else {

      const equipoData = this.equipoForm.value; 
      
      this.equipoService.postEquipo(equipoData).subscribe({
        next: () => {this.router.navigate(['/equipo-admin/', this.torneoID]),
            alert("Equipo agregado!")},
        error: (e) => {console.log(e), 
            alert("error al cargar el equipo"),
            this.router.navigate(['/equipo-admin/', this.torneoID])
        } });
    }
}


}