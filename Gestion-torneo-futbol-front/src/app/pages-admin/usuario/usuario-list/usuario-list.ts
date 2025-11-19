import { Component, OnInit } from '@angular/core';
import Usuario from '../../../model/usuario';
import { UsuarioService } from '../../../service/usuario-service/usuario-service';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CommonModule, Location} from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { Lightbox, LightboxModule } from 'ngx-lightbox';
import { SubscriptionLog } from 'rxjs/internal/testing/SubscriptionLog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario-list',
  imports: [RouterLink, CommonModule, TranslocoPipe, LightboxModule],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.css',
})
export class UsuarioList implements OnInit{

  usuarios: Usuario[] = [];
  usuario?: Usuario;
      currentUserId: string | null = null;
      private querySub: Subscription | undefined;

  constructor(private usuarioService: UsuarioService,
    private location: Location,
    private lightbox: Lightbox,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();

      this.querySub = this.route.queryParamMap.subscribe(params => {
        const idFromQuery = params.get('referrerId'); 
        
        if (idFromQuery) {
            this.currentUserId = idFromQuery;
            console.log('ID del usuario logueado recibido por Query Param:', this.currentUserId);
        }
    });

    this.usuarioService.getUsuarios().subscribe(data => {
  this.usuarios = data;
  console.table(this.usuarios);
});
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
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
    
      this.lightbox.open(album,0);
}

    goBack(): void {
    this.router.navigate(['/admin/usuario-home', this.currentUserId])
  }



}
