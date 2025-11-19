import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from "@angular/router";
import Torneo from '../../../model/torneo';
import { TorneoService } from '../../../service/torneo-service/torneo-service';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { Lightbox, LightboxModule } from 'ngx-lightbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-torneo-list',
  imports: [CommonModule, RouterModule, TranslocoPipe, LightboxModule],
  templateUrl: './torneo-list-admin.html',
  styleUrl: './torneo-list-admin.css',
})
export class TorneoListAdmin implements OnInit{

    torneos: Torneo[] = [];
    currentUserId: string | null = null;
    private querySub: Subscription | undefined;

  constructor(private torneoService: TorneoService,
              private router: Router,
              private location: Location,
              private lightbox: Lightbox,
              private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

  this.querySub = this.route.queryParamMap.subscribe(params => {
        const idFromQuery = params.get('referrerId'); 
        
        if (idFromQuery) {
            this.currentUserId = idFromQuery;
            console.log('ID del usuario logueado recibido por Query Param:', this.currentUserId);
        }
    });

    this.cargarTorneo();
  }
  

  cargarTorneo(): void {

    this.torneoService.getTorneo().subscribe(data => {
      console.log(data)
      this.torneos = data});
  }

  verEquipos(torneoId: string) {
    this.router.navigate(['/admin/equipos-admin', torneoId]);
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
     this.router.navigate(['/admin/usuario-home/', this.currentUserId]);
  }
  
}