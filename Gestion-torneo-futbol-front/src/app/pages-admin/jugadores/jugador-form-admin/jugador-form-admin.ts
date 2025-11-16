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
  jugadorID?: number ; 
  equipoID?: number;
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
      foto: [''], 
      idEquipo: ['', Validators.required],
      edad: [''],
      fechaNacimiento: ['', Validators.required],
      numeroCamiseta: ['', Validators.required]
    });

    const rawJugadorId = this.route.snapshot.params['id'];
    this.jugadorID = rawJugadorId !== undefined && rawJugadorId !== null ? Number(rawJugadorId) : undefined;

    if (this.jugadorID != null && !Number.isNaN(this.jugadorID)) {
      this.jugadorService.getJugadorById(this.jugadorID).subscribe(data => {
        this.fotoActual = data.foto;
        this.equipoID = data.idEquipo;
        const datosParaFormulario = { ...data } as any;
        // Ensure idEquipo is set as string for the form control display
        datosParaFormulario.idEquipo = String(data.idEquipo);
        this.jugadorForm.patchValue(datosParaFormulario);
      });
    } else {
      const rawEquipoId = this.route.snapshot.params['equipoID'];
      this.equipoID = rawEquipoId !== undefined && rawEquipoId !== null ? Number(rawEquipoId) : undefined;
      if (this.equipoID != null && !Number.isNaN(this.equipoID)) {
        this.jugadorForm.patchValue({ idEquipo: String(this.equipoID) });
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
        foto: formValues.foto || this.fotoActual,
        idEquipo: Number(formValues.idEquipo),
        edad: formValues.edad !== undefined ? Number(formValues.edad) : 0,
        numeroCamiseta: formValues.numeroCamiseta !== undefined ? Number(formValues.numeroCamiseta) : 0
      } as Jugador;

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
      const formValues = this.jugadorForm.value;
      const jugadorData: Jugador = {
        nombre: formValues.nombre,
        fechaNacimiento: formValues.fechaNacimiento,
        foto: formValues.foto || '',
        idEquipo: Number(formValues.idEquipo),
        edad: formValues.edad !== undefined ? Number(formValues.edad) : 0,
        numeroCamiseta: formValues.numeroCamiseta !== undefined ? Number(formValues.numeroCamiseta) : 0,
        posicion: formValues.posicion || '',
      } as Jugador;

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
