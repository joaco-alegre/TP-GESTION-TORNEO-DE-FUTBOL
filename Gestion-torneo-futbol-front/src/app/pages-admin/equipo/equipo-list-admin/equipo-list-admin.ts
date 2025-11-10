import { Component, OnInit } from '@angular/core';
import Equipo from '../../../model/equipo';
import { EquipoService } from '../../../service/equipo-service/equipo-service';
import { ActivatedRoute, Route, RouterLink, RouterModule } from "@angular/router";
import { CommonModule, Location } from '@angular/common';
import { TorneoService } from '../../../service/torneo-service/torneo-service';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-equipo-list',
  imports: [RouterModule, CommonModule, TranslocoPipe],
  templateUrl: './equipo-list-admin.html',
  styleUrl: './equipo-list-admin.css',
})
export class EquipoListAdmin implements OnInit{

  
      equipos: Equipo[] = [];
      nombreTorneo?: string;
      private todosEquipos: Equipo[] = [];
      torneoId: string | null = null;
    
      constructor(private equipoService: EquipoService,
                private location: Location,
                private route: ActivatedRoute,
                private torneoService: TorneoService,
      ) {}
    
      ngOnInit(): void {

    this.torneoId = this.route.snapshot.paramMap.get('id');

    if (!this.torneoId) {
      console.error('No se encontró ID de torneo en la URL');
      return;
    }

    this.torneoService.getTorneoById(this.torneoId).subscribe(torneoData => {
      this.nombreTorneo = torneoData.nombre;
    });

    this.equipoService.getEquipos().subscribe(data => { 
      this.todosEquipos = data;
      this.filtrarEquiposPorTorneo(); 
    });
  }

      cargarEquipo(): void {
    
        this.equipoService.getEquipos().subscribe(data => {
          console.log(data)
          this.equipos = data});
      }
    
      // deleteEquipo(id: string): void {
      
      //     this.equipoService.deleteEquipo(id).subscribe(() => {
      //       this.filtrarEquiposPorTorneo(),
      //       alert("equipo eliminado")
      //     });
        
      // }

      deleteEquipo(id: string): void {
  
  if (!confirm("¿Estás seguro de que deseas eliminar este equipo?")) {
    return; 
  }
  this.equipoService.deleteEquipo(id).subscribe(() => {
    const index = this.todosEquipos.findIndex(equipo => equipo.id === id);
    if (index > -1) {
      this.todosEquipos.splice(index, 1);
    }
    this.filtrarEquiposPorTorneo(); 
    alert("Equipo eliminado");
  }, (error) => {
    console.error("Error al eliminar el equipo:", error);
    alert("No se pudo eliminar el equipo.");
  });
}





      filtrarEquiposPorTorneo(): void {
    if (this.torneoId) { 
      this.equipos = this.todosEquipos.filter(
        (equipo) => equipo.idTorneo === this.torneoId 
      );
    } else {
      this.equipos = [];
    }
  }
  
    goBack(): void {
    this.location.back();
  }


}
