import { Component, OnInit } from '@angular/core';
import Torneo from '../../../model/torneo';
import { TorneoService } from '../../../service/torneo-service/torneo-service';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-torneo-list',
  imports: [CommonModule, RouterModule, TranslocoPipe],
  templateUrl: './torneo-list.html',
  styleUrl: './torneo-list.css'
})
export class TorneoList implements OnInit{

  
    torneos: Torneo[] = [];
  
    constructor(private torneoService: TorneoService,
      private location: Location,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.getTorneos();
    }
  
    getTorneos(): void {
      this.torneoService.getTorneos().subscribe(data => {
  this.torneos = data;
        });
    }

  //   abrirImagen(): void {
  //   const src = this.torneo.foto ? this.torneo.foto : 'assets/icons/persona.png';
  //   const caption = this.jugador.nombre;
    
  //   // Creamos un "álbum" de una sola imagen
  //   const album = {
  //      src: src,
  //      caption: caption,
  //      thumb: src
  //   };

  //   // Abrimos el lightbox
  //   this._lightbox.open([album], 0, {
  //     // Opciones extra (opcional)
  //     centerVertically: true,
  //     fitImageInViewPort: true,
  //     disableScrolling: true
  //   });
  // }
  
        goBack(): void {
    this.router.navigate(['/']);
  }

    
    

}
