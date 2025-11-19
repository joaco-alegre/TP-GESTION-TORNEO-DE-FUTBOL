import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { JugadorService } from '../../../service/jugador-service/jugador-service';
import { ActivatedRoute, Router } from '@angular/router';
import Jugador from '../../../model/jugador';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-jugador-form',
  imports: [CommonModule, TranslocoPipe, ReactiveFormsModule],
  templateUrl: './jugador-form-admin.html',
  styleUrls: ['./jugador-form-admin.css']
})
export class JugadorFormAdmin implements OnInit{

  jugadorForm!: FormGroup;
  jugadorID?: string ; 
  equipoID?: string;
  fotoActual?: string; 

  constructor(
    private fb: FormBuilder,
    private jugadorService: JugadorService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
  
    this.jugadorForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      foto: ['',  Validators.required], 
      idEquipo: ['', Validators.required],
      edad: [{ value: null, disabled: true }],
      fechaNacimiento: ['', Validators.required],
      numeroCamiseta: ['', Validators.required]
    });

    this.jugadorForm.get('fechaNacimiento')?.valueChanges.subscribe(fecha => {
      const edadCalculada = this.calcularEdad(fecha);
      if (edadCalculada) {
        this.jugadorForm.get('edad')?.setValue(edadCalculada, { emitEvent: false });
      }
    });


    this.jugadorID = this.route.snapshot.params['id'];

    if (this.jugadorID) {
      this.jugadorService.getJugadorById(this.jugadorID).subscribe(data => {

        const fechaObj = new Date(data.fechaNacimiento);
        const anio = fechaObj.getFullYear();
        const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
        const dia = String(fechaObj.getDate()).padStart(2, '0');
        
        const fechaCorta = `${anio}-${mes}-${dia}`;

        this.fotoActual = data.foto;
        this.equipoID = data.idEquipo;
        const datosParaFormulario = { ...data };
        this.jugadorForm.patchValue(datosParaFormulario);
      });

    } else {
      this.equipoID = this.route.snapshot.params['equipoID'];
      if (this.equipoID) {
        this.jugadorForm.patchValue({ idEquipo: this.equipoID });
      }
    }

    this.equipoID = this.route.snapshot.queryParamMap.get('equipoID') || undefined;

    if (this.equipoID) {
      this.jugadorForm.patchValue({ idEquipo: this.equipoID });
    }

  }

  private calcularEdad(birthdate: string): number | null {
    if (!birthdate) return null;
    
    const hoy = new Date();
    const fechaCumple = new Date(birthdate);
    let age = hoy.getFullYear() - fechaCumple.getFullYear();
    const m = hoy.getMonth() - fechaCumple.getMonth();
    
    if (m < 0 || (m === 0 && hoy.getDate() < fechaCumple.getDate())) {
      age--;
    }
    return age;
  }



  onSubmit(): void {

    if (this.jugadorForm.invalid) {
      this.jugadorForm.markAllAsTouched();
      return;
    }

    if (this.jugadorID) {
      const formValues = this.jugadorForm.value;
      const jugadorData: Jugador = { 
        ...formValues, 
        id: this.jugadorID, 
        foto: formValues.foto || this.fotoActual 
      }; 

      this.jugadorService.updateJugador(jugadorData).subscribe({
        next: () => {
          this.router.navigate(['/admin/jugador-detalles-admin/', this.jugadorID]);
          alert("Jugador actualizado!");
        },
        error: (e) => {
          console.log(e);
          this.router.navigate(['/admin/jugador-lista-admin', this.equipoID]); 
          alert("Error al actualizar el jugador");
        } 
      });

    } else {

      const jugadorData = this.jugadorForm.value; 
      delete jugadorData.id;
      
      this.jugadorService.postJugador(jugadorData).subscribe({
        next: () => {
          this.router.navigate(['/admin/jugador-lista-admin', this.equipoID]);
          alert("Jugador agregado!");
        },
        error: (e) => {
          console.log(e); 
          alert("Error al cargar el jugador");
          this.router.navigate(['/admin/jugador-lista-admin', this.equipoID]);
        } 
      });
    }
  }

    goBack(): void {
    
    if (this.jugadorID) {
        this.router.navigate(['/admin/jugador-detalles-admin', this.jugadorID]);
    } 

    else if (this.equipoID) {
        this.router.navigate(['/admin/jugador-lista-admin', this.equipoID]);
    }
    else {
        this.router.navigate(['/admin/admin-menu']);
    }
}

}
