import { Component, OnInit } from '@angular/core';
import Equipo from '../../../model/equipo';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import { RouterLink, RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipo-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './equipo-list-admin.html',
  styleUrl: './equipo-list-admin.css',
})
export class EquipoListAdmin implements OnInit{

  
        equipos: Equipo[] = [];
    
      constructor(private equipoService: EquipoService) {}
    
      ngOnInit(): void {
        this.cargarEquipo();
      }
    
      cargarEquipo(): void {
    
        this.equipoService.getEquipos().subscribe(data => {
          console.log(data)
          this.equipos = data});
      }
    
      deleteEquipo(id: string): void {
      
          this.equipoService.deleteEquipo(id).subscribe(() => this.cargarEquipo());
        
      }
  


}
