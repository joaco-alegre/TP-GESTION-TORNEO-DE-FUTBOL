import { Component, OnInit } from '@angular/core';
import { DtService } from '../../../service/dt-service/dt-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import DT from '../../../model/dt';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { LightboxModule, Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-dt-details-admin',
  imports: [CommonModule, TranslocoPipe, RouterLink, LightboxModule],
  templateUrl: './dt-details-admin.html',
  styleUrl: './dt-details-admin.css',
})
export class DtDetailsAdmin  implements OnInit{

      dt?: DT;
      returnUrl?: string = '/admin/usuario-home';
  
    constructor(
      private dtService: DtService,
      private route: ActivatedRoute,
      private location: Location,
      private lightbox: Lightbox, 
      private router: Router,
    ) {}
  
    
    ngOnInit(): void {
      const id = this.route.snapshot.params['id'];
      this.dtService.geDtById(id).subscribe(data => this.dt = data);

      this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/admin/usuario-home';
    }



    sacarDt(dt: DT): void {
    
    if (!confirm(`¿Estás seguro de que deseas sacar a ${dt.nombre} de este equipo?`)) {
      return;
    }
    const dtActualizado = { 
      ...dt, 
      equipoID: '' 
    };

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

      if(this.returnUrl){
     this.router.navigateByUrl(this.returnUrl);
      }
    }

}
