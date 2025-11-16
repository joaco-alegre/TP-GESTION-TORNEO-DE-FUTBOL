import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { DtService } from '../../../service/dt-service/dt-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import DT from '../../../model/dt';

@Component({
  selector: 'app-dt-dt-form',
  imports: [CommonModule, ɵInternalFormsSharedModule, ReactiveFormsModule, TranslocoPipe],
  templateUrl: './dt-dt-form.html',
  styleUrl: './dt-dt-form.css',
})
export class DtDtForm implements OnInit{

  
  DtForm!: FormGroup;
  DtID?: number; 
  equipoID?: number; 

  constructor(
    private fb: FormBuilder,
    private dtService: DtService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
  
    this.DtForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      equipoID: [''], 
      estiloJuego: ['', Validators.required],
      usuario: ['', [Validators.required]],
      foto: ['', []]
    });

    const rawId = this.route.snapshot.params['id'];
    this.DtID = rawId !== undefined && rawId !== null ? Number(rawId) : undefined;

    if (this.DtID != null && !Number.isNaN(this.DtID)) {
      this.dtService.geDtById(this.DtID).subscribe(data => {
        const datosParaFormulario = { ...data } as any;  
        datosParaFormulario.equipoID = data.equipoID != null ? String(data.equipoID) : '';
        this.DtForm.patchValue(datosParaFormulario);
        this.equipoID = data.equipoID; 
      });

    } else {
      const rawQueryEquipo = this.route.snapshot.queryParamMap.get('equipoID');
      this.equipoID = rawQueryEquipo != null ? Number(rawQueryEquipo) : undefined;
      if (this.equipoID != null) {
        this.DtForm.patchValue({ equipoID: String(this.equipoID) });
      }
    }
  }

  onSubmit(): void {

    if (this.DtForm.invalid) return;
    const rutaDeVuelta = ['/dt-dt-details', this.DtID];

    if (this.DtID) {
      const formValues = this.DtForm.value;
      const dtData: DT = { id: this.DtID, ...formValues, equipoID: formValues.equipoID ? Number(formValues.equipoID) : undefined } as DT;

      this.dtService.updateDt(dtData).subscribe({
        next: () => {
          this.router.navigate(rutaDeVuelta);
          alert("datos actualizado!");
        },
        error: (e) => {
          console.log(e); 
          alert("Error al actualizar sus datos");
          this.router.navigate(rutaDeVuelta);
        } 
      });

    } 
  }

    goBack(): void {
    this.location.back();
  }

}
