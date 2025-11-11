import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../../service/usuario-service/usuario-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-usuario-form',
  imports: [CommonModule, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.css',
})
export class UsuarioForm implements OnInit{

usuarioForm!: FormGroup;
  usuarioID?: string;
  fotoActual: string | undefined;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {

    this.usuarioForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      rol: ['', Validators.required],
      foto: [''], 
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.usuarioID = this.route.snapshot.params['id'];

    if (this.usuarioID) {

      this.usuarioForm.get('password')?.clearValidators();
      this.usuarioForm.get('password')?.updateValueAndValidity();

      this.usuarioService.getUsuarioById(this.usuarioID).subscribe(data => {
        this.fotoActual = data.foto;
        const datosParaFormulario = { ...data };

        this.usuarioForm.patchValue(datosParaFormulario);
      });
    }
  }

  onSubmit(): void {
    if (this.usuarioForm.invalid) return;

    const rutaDeVuelta = ['/panel-admin'];

    if (this.usuarioID) {

      const formValues = this.usuarioForm.value;
      const usuarioData = { ...formValues, id: this.usuarioID, foto: formValues.foto || this.fotoActual };

      this.usuarioService.updateUsuario(usuarioData).subscribe({

        next: () => {this.router.navigate(rutaDeVuelta);
                    alert("Usuario actualizado con exito!")},
        error: (e) => console.error(e)
      });

    } else {

      const usuarioData = this.usuarioForm.value;

      this.usuarioService.postUsuario(usuarioData).subscribe({

        next: () => {this.router.navigate(rutaDeVuelta);
                    alert("Usuario creado con exito!")},
        error: (e) => console.error(e)
      });
    }
  }

  goBack(): void {
    this.location.back();
  }


}
