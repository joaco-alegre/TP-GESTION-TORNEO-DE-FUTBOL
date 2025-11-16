import { Component, OnInit } from '@angular/core';
import { DtService } from '../../../service/dt-service/dt-service';
import DT from '../../../model/dt';
import { RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-dt-list',
  imports: [RouterModule, CommonModule, TranslocoPipe],
  templateUrl: './dt-list-admin.html',
  styleUrl: './dt-list-admin.css',
})
export class DtListAdmin implements OnInit{

  dts: DT[] = [];

  constructor(
    private dtService: DtService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.cargarDts();
  }

  cargarDts(): void {
    this.dtService.getDTs().subscribe(data => {
      this.dts = data;
    });
  }

  deleteDt(id: number): void {
    
    if (!confirm("¿Estás seguro de que deseas eliminar este DT?")) {
      return; 
    }

    this.dtService.deleteDt(id).subscribe(() => {
      
      const index = this.dts.findIndex(dt => dt.id === id);
      if (index > -1) {
        this.dts.splice(index, 1);
      }
      alert("DT eliminado exitosamente");

    }, (error) => {
      console.error("Error al eliminar el DT:", error);
      alert("No se pudo eliminar el DT.");
    });
  }

        goBack(): void {
    this.location.back();
  }

}
