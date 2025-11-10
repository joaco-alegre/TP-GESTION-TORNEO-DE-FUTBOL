import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { TorneoService } from '../../../service/torneo-service/torneo-service';
import { ActivatedRoute, Router } from '@angular/router';
import Torneo from '../../../model/torneo';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-torneo-form',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, TranslocoPipe, CommonModule],
  templateUrl: './torneo-form-admin.html',
  styleUrl: './torneo-form-admin.css',
})
export class TorneoFormAdmin implements OnInit{

  torneoForm!: FormGroup;
  torneoID?: string;

  constructor(
    private fb: FormBuilder,
    private torneoService: TorneoService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {

    this.torneoForm = this.fb.group({
      
      id: [''],
      nombre: ['', Validators.required],
      logo: ['', []],
      ultimoCampeon: ['', []],
      estadoTorneo: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]]
    });

this.torneoID = this.route.snapshot.params['id'];
    if (this.torneoID) {
      this.torneoService.getTorneoById(this.torneoID)
        .subscribe(data => {
          const datosParaFormulario = { ...data };
          this.torneoForm.patchValue(datosParaFormulario);
        });

    }    
}



  onSubmit(): void {
  
    if (this.torneoForm.invalid) return;

    if (this.torneoID) {

      const torneoData: Torneo = { id: this.torneoID, ...this.torneoForm.value }; 

      this.torneoService.updateTorneo(torneoData).subscribe({
        next: () => {this.router.navigate(['/torneos-admin']),
            alert("Torneo actualizado!")},
        error: (e) => {console.log(e), 
            alert("error al actualizar el torneo"),
            this.router.navigate(['/torneos-admin'])
        } });

    } else {

      const torneoData = this.torneoForm.value; 

      delete torneoData.id;
      
      this.torneoService.postTorneo(torneoData).subscribe({
        next: () => {this.router.navigate(['/torneos-admin']),
            alert("Torneo agregado!")},
        error: (e) => {console.log(e), 
            alert("error al cargar el torneo"),
            this.router.navigate(['/torneos-admin'])
        } });
    }
  }

      goBack(): void {
    this.location.back();
  }
}
