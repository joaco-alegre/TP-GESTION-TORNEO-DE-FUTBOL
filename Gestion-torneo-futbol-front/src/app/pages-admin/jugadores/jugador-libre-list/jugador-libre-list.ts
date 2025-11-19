import { Component, OnInit } from '@angular/core';
import { JugadorService } from '../../../service/jugador-service/jugador-service';
import Jugador from '../../../model/jugador';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { Lightbox, LightboxModule } from 'ngx-lightbox';

@Component({
  selector: 'app-jugador-libre-list',
  imports: [RouterModule, CommonModule, TranslocoPipe, LightboxModule],
  templateUrl: './jugador-libre-list.html',
  styleUrl: './jugador-libre-list.css',
})
export class JugadorLibreList implements OnInit{

  jugadoresLibres: Jugador[] = [];
  todosJugadores: Jugador[] = [];

  constructor(
    private jugadorService: JugadorService,
    private location: Location,
    private lightbox: Lightbox,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarJugadores();
  }

  cargarJugadores(): void {
    this.jugadorService.getJugadores().subscribe(data => {
      this.todosJugadores = data; 
      this.filtrarJugadoresLibres(); 
    });
  }

  filtrarJugadoresLibres(): void {
    this.jugadoresLibres = this.todosJugadores.filter(
      (data) => !data.idEquipo || data.idEquipo.trim() === ''
    );
  }

  deleteJugador(id: string): void {
    
    if (!confirm("¿Estás seguro de que deseas ELIMINAR a este jugador PERMANENTEMENTE?")) {
      return; 
    }

    this.jugadorService.deleteJugador(id).subscribe(() => {
      
      const index = this.todosJugadores.findIndex(j => j.id === id);
      if (index > -1) {
        this.todosJugadores.splice(index, 1);
      }
      
      this.filtrarJugadoresLibres();
      
      alert("Jugador eliminado exitosamente");

    }, (error) => {
      console.error("Error al eliminar el jugador:", error);
      alert("No se pudo eliminar el jugador.");
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
    
      this.lightbox.open(album, 0);
}

goBack(): void {
    this.router.navigate(['/usuario-home'])
  }



}
