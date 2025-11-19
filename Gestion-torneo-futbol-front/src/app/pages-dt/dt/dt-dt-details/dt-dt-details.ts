import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import { DtService } from '../../../service/dt-service/dt-service';
import DT from '../../../model/dt';
import { Lightbox, LightboxModule } from 'ngx-lightbox';

@Component({
  selector: 'app-dt-dt-details',
  imports: [CommonModule, RouterModule, TranslocoPipe, LightboxModule],
  templateUrl: './dt-dt-details.html',
  styleUrl: './dt-dt-details.css',
})
export class DtDtDetails implements OnInit{

  dt?: DT;
  usuarioId: string | null = null;

  constructor(
    private dtService: DtService,
    private router: Router,
    private location: Location,
    private lightbox: Lightbox,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.usuarioId = this.route.snapshot.paramMap.get('id');

    if (this.usuarioId) {
      this.dtService.geDtById(this.usuarioId).subscribe({
        next: (data) => {
          this.dt = data;
        },
        error: (err) => {
          console.error("No se pudo cargar el perfil del DT:", err);
          alert("Error al cargar el perfil. Serás redirigido.");
          this.router.navigate(['dt/dt-home', this.usuarioId]); 
        }
      });
    }
  }


  deleteDT(): void {
    if (!this.dt || !this.dt.id) return;

    if (confirm("¿Estás seguro de que deseas ELIMINAR tu propia cuenta? Esta acción no se puede deshacer.")) {
      
      this.dtService.deleteDt(this.dt.id).subscribe({
        next: () => {
          alert("Cuenta eliminada.");
          this.router.navigate(['/es/inicio-sesion']);
        },
        error: (e) => {
          console.error(e);
          alert("Error al eliminar la cuenta.");
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
    
      this.lightbox.open(album,0);
}

  goBack(): void {
    this.router.navigate(['/dt/dt-home', this.usuarioId]);
  }

}
