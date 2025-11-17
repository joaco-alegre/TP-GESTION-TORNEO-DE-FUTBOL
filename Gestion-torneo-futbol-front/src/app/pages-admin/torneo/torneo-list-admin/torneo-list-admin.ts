import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from "@angular/router";
import Torneo from '../../../model/torneo';
import { TorneoService } from '../../../service/torneo-service/torneo-service';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { Lightbox, LightboxModule } from 'ngx-lightbox';

@Component({
  selector: 'app-torneo-list',
  imports: [CommonModule, RouterModule, TranslocoPipe, LightboxModule],
  templateUrl: './torneo-list-admin.html',
  styleUrl: './torneo-list-admin.css',
})
export class TorneoListAdmin implements OnInit{

    torneos: Torneo[] = [];

  constructor(private torneoService: TorneoService,
              public router: Router,
              private location: Location,
              private lightbox: Lightbox
  ) {}

  ngOnInit(): void {
    this.cargarTorneo();
  }

  cargarTorneo(): void {

  this.torneoService.getTorneos().subscribe(data => {
  this.torneos = data;
});
  }

  verEquipos(torneoId: number) {
    this.router.navigate(['/equipos-admin', torneoId]);
  }

  abrirImagen(url: string | null | undefined): void {
      if (!url) {
        console.error("No hay URL de imagen para mostrar.");
        return;
      }
    
      const album = [
        {
          src: url,
          caption: '',
          thumb: url
        }
      ];

      this.lightbox.open(album, 0);



    }

    goBack(): void {
    this.router.navigate(['usuario-home/', ]);
  }
  
  confirmDelete(id: number | undefined): void {
    if (!id) return;
    if (!confirm('¿Desea eliminar este torneo?')) return;
    this.torneoService.deleteTorneo(id).subscribe({
      next: () => {
        alert('Torneo eliminado');
        this.cargarTorneo();
      },
      error: (e) => {
        console.error(e);
        alert('Error al eliminar torneo');
      }
    });
  }
  
  trackById(index: number, item: Torneo): number | undefined {
    return item.id; // Ensure `id` is unique for each torneo
  }
}