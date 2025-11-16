import { Component, OnInit } from '@angular/core';
import Torneo from '../../../model/torneo';
import { TorneoService } from '../../../service/torneo-service/torneo-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { Lightbox, LightboxModule } from 'ngx-lightbox';

@Component({
  selector: 'app-torneo-details',
  imports: [CommonModule, TranslocoPipe, RouterLink, LightboxModule],
  templateUrl: './torneo-details-admin.html',
  styleUrl: './torneo-details-admin.css',
})
export class TorneoDetailsAdmin implements OnInit{

    torneo?: Torneo;

  constructor(
    private torneoService: TorneoService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private lightbox: Lightbox
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.torneoService.getTorneoById(id).subscribe(data => this.torneo = data);
  }

    deleteTorneo(id: number): void {

      if (!confirm("¿Estás seguro de que deseas eliminar este torneo?")) {
    return; 
  }
  this.torneoService.deleteTorneo(id).subscribe({
        next: () => {
          alert("Torneo eliminado exitosamente.");
          this.router.navigate(['/torneos-admin']); 
        },
        error: (e) => {
          console.error("Error al eliminar el torneo:", e);
          alert("No se pudo eliminar el torneo.");
        }
      });
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
    this.router.navigate(['/torneos-admin', ]);
  }

}
