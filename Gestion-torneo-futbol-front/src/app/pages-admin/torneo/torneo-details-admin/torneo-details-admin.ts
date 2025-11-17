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

    // Debugging: Log the route parameter
    console.log('ID passed to getTorneoById:', id);

    // Validate the ID parameter
    if (!id) {
      console.error('ID del torneo no válido o no proporcionado.');
      alert('No se pudo cargar el torneo. ID no válido.');
      this.router.navigate(['/torneos-admin']);
      return;
    }

    // Fetch tournament details
    this.torneoService.getTorneoById(id).subscribe({
      next: (data) => {
        console.log('Tournament details fetched successfully:', data);
        this.torneo = data;
      },
      error: (e) => {
        console.error('Error response:', e);
        alert('No se pudieron cargar los detalles del torneo.');
        this.router.navigate(['/torneos-admin']);
      }
    });
  }

  deleteTorneo(id: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este torneo?')) {
      return; 
    }

    this.torneoService.deleteTorneo(id).subscribe({
      next: () => {
        alert('Torneo eliminado exitosamente.');
        this.router.navigate(['/torneos-admin']); 
      },
      error: (e) => {
        console.error('Error al eliminar el torneo:', e);
        alert('No se pudo eliminar el torneo. Por favor, inténtalo de nuevo más tarde.');
      }
    });
  }

  abrirImagen(url: string | null | undefined): void {
    if (!url) {
      console.error('No hay URL de imagen para mostrar.');
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
    this.router.navigate(['/torneos-admin']);
  }

}
