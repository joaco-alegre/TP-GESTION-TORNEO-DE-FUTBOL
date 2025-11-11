import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoticiaService } from '../../../service/noticia-service/noticia-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-noticia-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './noticia-form.html',
  styleUrl: './noticia-form.css',
})
export class NoticiaForm implements OnInit{

  noticiaForm!: FormGroup;
  noticiaID?: string ;

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
    titulo: ['', Validators.required],
    link: ['', Validators.required],
    foto: [''] 
  });

  this.noticiaID = this.route.snapshot.params['id'];
  if (this.noticiaID) {
    this.noticiaService.getNoticiaById(this.noticiaID).subscribe(data => {

      console.log("Datos recibidos del servicio:", data);
    });
  }
}

  onSubmit(): void {
    if (this.noticiaForm.invalid) return;

    const rutaDeVuelta = ['/panel-noticias'];

    if (this.noticiaID) {

      const noticiaData = { ...this.noticiaForm.value, id: this.noticiaID };
      this.noticiaService.updateNoticia(noticiaData).subscribe({
        next: () => {
          this.router.navigate(rutaDeVuelta);
          alert("Noticia actualizada!");
        },
        error: (e) => console.error(e)
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
