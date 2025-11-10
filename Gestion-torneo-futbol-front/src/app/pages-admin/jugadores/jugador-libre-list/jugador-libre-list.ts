import { Component, OnInit } from '@angular/core';
import { JugadorService } from '../../../service/jugador-service/jugador-service';
import Jugador from '../../../model/jugador';
import { RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-jugador-libre-list',
  imports: [RouterModule, CommonModule, TranslocoPipe],
  templateUrl: './jugador-libre-list.html',
  styleUrl: './jugador-libre-list.css',
})
export class JugadorLibreList implements OnInit{

  jugadoresLibres: Jugador[] = [];
  todosJugadores: Jugador[] = [];

  constructor(
    private jugadorService: JugadorService,
    private location: Location
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


    goBack(): void {
    this.location.back();
  }

}
