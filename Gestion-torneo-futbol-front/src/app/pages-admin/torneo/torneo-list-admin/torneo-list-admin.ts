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
              private router: Router,
              private location: Location,
              private lightbox: Lightbox
  ) {}

  ngOnInit(): void {
    this.cargarTorneo();
  }

  cargarTorneo(): void {

    this.torneoService.getTorneo().subscribe(data => {
      console.log(data)
      this.torneos = data});
  }

  verEquipos(torneoId: string) {
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
    this.router.navigate(['/admin/usuario-home/', ]);
  }
  
}