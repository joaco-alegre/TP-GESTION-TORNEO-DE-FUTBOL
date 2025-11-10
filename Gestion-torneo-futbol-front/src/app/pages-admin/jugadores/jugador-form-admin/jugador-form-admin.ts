import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { JugadorService } from '../../../service/jugador-service/jugador-service';
import { ActivatedRoute, Router } from '@angular/router';
import Jugador from '../../../model/jugador';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-jugador-form',
  imports: [CommonModule, TranslocoPipe, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './jugador-form-admin.html',
  styleUrl: './jugador-form-admin.css',
})
export class JugadorFormAdmin implements OnInit{

  jugadorForm!: FormGroup;
  jugadorID: string | null = null; 
  equipoID: string | null = null; 
  fotoActual: string | undefined; 

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
      foto: [''], 
      idEquipo: ['', Validators.required],
      edad: [''],
      fechaNacimiento: ['', Validators.required],
      numeroCamiseta: ['', Validators.required]
    });

    this.jugadorID = this.route.snapshot.params['id'];

    if (this.jugadorID) {
      this.jugadorService.getJugadorById(this.jugadorID).subscribe(data => {

        this.fotoActual = data.foto;
        this.equipoID = data.idEquipo;
        const datosParaFormulario = { ...data };
        this.jugadorForm.patchValue(datosParaFormulario);
      });

    } else {
      this.equipoID = this.route.snapshot.queryParamMap.get('equipoID');
      if (this.equipoID) {
        this.jugadorForm.patchValue({ idEquipo: this.equipoID });
      }
    }
  }

  onSubmit(): void {

    if (this.jugadorForm.invalid) return;
    const rutaDeVuelta = ['/jugador-lista-admin', this.equipoID];

    if (this.jugadorID) {
      const formValues = this.jugadorForm.value;
      const jugadorData: Jugador = { 
        ...formValues, 
        id: this.jugadorID, 
        foto: formValues.foto || this.fotoActual // Usa la foto nueva o la vieja
      }; 

      this.jugadorService.updateJugador(jugadorData).subscribe({
        next: () => {
          this.router.navigate(rutaDeVuelta);
          alert("Jugador actualizado!");
        },
        error: (e) => {
          console.log(e); 
          alert("Error al actualizar el jugador");
        } 
      });

    } else {
      const jugadorData = this.jugadorForm.value; 
      delete jugadorData.id;
      
      this.jugadorService.postJugador(jugadorData).subscribe({
        next: () => {
          this.router.navigate(rutaDeVuelta);
          alert("Jugador agregado!");
        },
        error: (e) => {
          console.log(e); 
          alert("Error al cargar el jugador");
        } 
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
