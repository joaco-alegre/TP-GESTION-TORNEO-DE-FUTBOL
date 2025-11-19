import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Usuario from '../../../model/usuario';
import { UsuarioService } from '../../../service/usuario-service/usuario-service';
import { TranslocoPipe } from '@ngneat/transloco';
import { LightboxModule, Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-usuario-details',
  imports: [CommonModule, RouterModule, TranslocoPipe, LightboxModule],
  templateUrl: './usuario-details.html',
  styleUrl: './usuario-details.css',
})
export class UsuarioDetails implements OnInit{

  usuario?: Usuario;
  usuarioId: string | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private location: Location,
    private lightbox: Lightbox,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.usuarioId = this.route.snapshot.paramMap.get('id');

    if (this.usuarioId) {
      console.log('ID de Usuario recibido para detalles:', this.usuarioId);
      
       this.usuarioService.getUsuarioById(this.usuarioId).subscribe(data => {
       this.usuario = data;
       });
      
    } else {
      console.error('Error: No se encontró el ID del usuario en la ruta.');

    }
  
  }

  deleteUsuario(): void {
    if (!this.usuario || !this.usuario.id) return;

    if (confirm("¿Estás seguro de que deseas ELIMINAR tu propia cuenta? Esta acción no se puede deshacer.")) {
      
      this.usuarioService.deleteUsuario(this.usuario.id).subscribe({
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
    this.router.navigate(['admin/usuario-home/', this.usuarioId ]);
  }


}


