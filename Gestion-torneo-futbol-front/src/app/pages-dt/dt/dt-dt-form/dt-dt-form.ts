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
      foto: ['', [Validators.required]]
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

    if (this.DtForm.invalid) {
      this.DtForm.markAllAsTouched(); 
      return;
    }
    
    const rutaDeVuelta = ['/dt-dt-details', this.DtID];

    if (this.DtID) {
      const dtData: DT = { id: this.DtID, ...this.DtForm.value }; 

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
    this.router.navigate(['/dt-dt-details', this.DtID]);
  }

}
