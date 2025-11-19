import { Component, OnInit } from '@angular/core';
import { DtService } from '../../../service/dt-service/dt-service';
import DT from '../../../model/dt';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { Lightbox, LightboxModule } from 'ngx-lightbox';

@Component({
  selector: 'app-dt-list',
  imports: [RouterModule, CommonModule, TranslocoPipe, LightboxModule],
  templateUrl: './dt-list-admin.html',
  styleUrl: './dt-list-admin.css',
})
export class DtListAdmin implements OnInit{

  dts: DT[] = [];


  constructor(
    private dtService: DtService,
    private location: Location,
    private lightbox: Lightbox,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDts();
  }

  cargarDts(): void {
    this.dtService.getDTs().subscribe(data => {
      this.dts = data;
    });
  }

  deleteDt(id: string): void {
    
    if (!confirm("¿Estás seguro de que deseas eliminar este DT?")) {
      return; 
    }

    this.dtService.deleteDt(id).subscribe(() => {
      
      const index = this.dts.findIndex(dt => dt.id === id);
      if (index > -1) {
        this.dts.splice(index, 1);
      }
      alert("DT eliminado exitosamente");

    }, (error) => {
      console.error("Error al eliminar el DT:", error);
      alert("No se pudo eliminar el DT.");
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
    this.router.navigate(['/usuario-home']);
  }


}
