import { Component, OnInit } from '@angular/core';
import Equipo from '../../../model/equipo';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Torneo from '../../../model/torneo';
import { TorneoService } from '../../../service/torneo-service/torneo-service';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { Lightbox, LightboxModule } from 'ngx-lightbox';

@Component({
  selector: 'app-equipo-details',
  imports: [CommonModule, TranslocoPipe, RouterLink, LightboxModule],
  templateUrl: './equipo-details-admin.html',
  styleUrl: './equipo-details-admin.css',
})
export class EquipoDetailsAdmin implements OnInit{

    torneoDelEquipo?: Torneo;
    equipo?: Equipo;

  constructor(
    private equipoService: EquipoService,
    private route: ActivatedRoute,
    private router: Router,
    private torneoService: TorneoService,
    private location: Location,
    private lightbox: Lightbox
  ) {}

  ngOnInit(): void {

    const equipoId = this.route.snapshot.params['id'];
    this.equipoService.getEquipoById(equipoId).subscribe(data => this.equipo = data);

    if (!equipoId) {
      console.error('No se encontró ID de equipo');
      return;
    }

    this.equipoService.getEquipoById(equipoId).subscribe(equipoData => {
      this.equipo = equipoData;


      if (equipoData && equipoData.idTorneo) {
        this.torneoService.getTorneoById(equipoData.idTorneo).subscribe(torneoData => {
          this.torneoDelEquipo = torneoData;
      });
      }
    });
  }

  deleteEquipo(): void {
    if (!this.equipo  || !this.equipo.id) {
      console.error("No se puede eliminar: 'equipo' es undefined.");
      return;
    }
    if (confirm(`¿Estás seguro de que deseas eliminar a ${this.equipo.nombre}?`)) {
      
      this.equipoService.deleteEquipo(this.equipo?.id).subscribe({
        next: () => {
          alert("Equipo eliminado exitosamente.");
          this.router.navigate(['/equipo-admin/', this.equipo?.idTorneo]);
        },
        error: (e) => {
          console.error("Error al eliminar el equipo:", e);
          alert("No se pudo eliminar el equipo.");
        }
      });
    }
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
    this.router.navigate(['/admin/equipo-admin', this.equipo?.idTorneo]);
  }


}


