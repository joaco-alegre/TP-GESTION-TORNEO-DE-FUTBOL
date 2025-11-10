import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { DtService } from '../../../service/dt-service/dt-service';
import { ActivatedRoute, Router } from '@angular/router';
import DT from '../../../model/dt';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-dt-form',
  imports: [CommonModule, ɵInternalFormsSharedModule, ReactiveFormsModule, TranslocoPipe],
  templateUrl: './dt-form-admin.html',
  styleUrl: './dt-form-admin.css',
})
export class DtFormAdmin implements OnInit{

  DtForm!: FormGroup;
  DtID?: string; 
  equipoID?: string; 

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

    this.DtID = this.route.snapshot.params['id'];

    if (this.DtID) {
      this.dtService.geDtById(this.DtID).subscribe(data => {
        const datosParaFormulario = { ...data };  
        this.DtForm.patchValue(datosParaFormulario);
        this.equipoID = data.equipoID; 
      });

    } else {
      this.equipoID = this.route.snapshot.queryParamMap.get('equipoID') || undefined;;
      if (this.equipoID) {
        this.DtForm.patchValue({ equipoID: this.equipoID });
      }
    }
  }

  onSubmit(): void {

    if (this.DtForm.invalid) return;
    const rutaDeVuelta = ['/jugador-lista-admin', this.equipoID];

    if (this.DtID) {
      const dtData: DT = { id: this.DtID, ...this.DtForm.value }; 

      this.dtService.updateDt(dtData).subscribe({
        next: () => {
          this.router.navigate(rutaDeVuelta);
          alert("DT actualizado!");
        },
        error: (e) => {
          console.log(e); 
          alert("Error al actualizar el DT");
          this.router.navigate(rutaDeVuelta);
        } 
      });

    } else {
      const dtData = this.DtForm.value; 
      delete dtData.id; 
      
      this.dtService.postDT(dtData).subscribe({
        next: () => {
          this.router.navigate(rutaDeVuelta);
          alert("DT agregado!");
        },
        error: (e) => {
          console.log(e); 
          alert("Error al cargar el DT");
          this.router.navigate(rutaDeVuelta);
        } 
      });
    }
  }
        goBack(): void {
    this.location.back();
  }
}
