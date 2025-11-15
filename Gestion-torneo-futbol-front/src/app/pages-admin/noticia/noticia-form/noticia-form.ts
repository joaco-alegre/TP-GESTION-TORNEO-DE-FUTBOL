import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoticiaService } from '../../../service/noticia-service/noticia-service';
import { ActivatedRoute, Router } from '@angular/router';
import Noticia from '../../../model/noticia';

@Component({
  selector: 'app-noticia-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './noticia-form.html',
  styleUrl: './noticia-form.css',
})
export class NoticiaForm implements OnInit{

  noticiaForm!: FormGroup;
  noticiaID?: string ;

  fotoActual?: string;

  constructor(
    private fb: FormBuilder,
    private noticiaService: NoticiaService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}


ngOnInit(): void {

  this.noticiaForm = this.fb.group({
    
    id: [''],
    tituloEs: ['', Validators.required],
    tituloEn: ['', Validators.required],
    link: ['', Validators.required],
    foto: [''] 
  });

  this.noticiaID = this.route.snapshot.params['id'];

  if (this.noticiaID) {

    this.noticiaService.getNoticiaById(this.noticiaID).subscribe(data => {
  
        this.noticiaForm.patchValue(data);
      });
    };
  }






  onSubmit(): void {
    if (this.noticiaForm.invalid) return;

    const rutaDeVuelta = ['/panel-noticias-admin'];

    if (this.noticiaID) {

        const formValues = this.noticiaForm.value;
        const noticiaData: Noticia = { 
            ...formValues, 
            id: this.noticiaID, 
            foto: formValues.foto || this.fotoActual 
        }; 

      this.noticiaService.updateNoticia(noticiaData).subscribe({
        next: () => {
          this.router.navigate(rutaDeVuelta);
          alert("Noticia actualizada!");
        },
        error: (e) => {console.error(e);
          alert("Error al actualizar la noticia");}
      });

    } else {
      const noticiaData = this.noticiaForm.value;
      delete noticiaData.id; 

      this.noticiaService.postNoticia(noticiaData).subscribe({
        next: () => {
          this.router.navigate(rutaDeVuelta);
          alert("Noticia creada!");
        },
        error: (e) => console.error(e)
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
