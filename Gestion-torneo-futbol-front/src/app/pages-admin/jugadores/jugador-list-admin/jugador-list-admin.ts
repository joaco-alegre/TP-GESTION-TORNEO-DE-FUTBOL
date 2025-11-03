import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import Jugador from '../../../model/jugador';
import { JugadorService } from '../../../service/jugador-service/jugador-service';

@Component({
  selector: 'app-jugador-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './jugador-list-admin.html',
  styleUrl: './jugador-list-admin.css',
})
export class JugadorListAdmin implements OnInit{

      jugadores: Jugador[] = [];
  
    constructor(private jugadorService: JugadorService) {}
  
    ngOnInit(): void {
      this.cargarJugador();
    }
  
    cargarJugador(): void {
  
      this.jugadorService.getJugadores().subscribe(data => {
        console.log(data)
        this.jugadores = data});
    }
  
    deleteJugador(id: string): void {
    
        this.jugadorService.deleteJugador(id).subscribe(() => this.cargarJugador());
      
    }


}
