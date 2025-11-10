import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from "@angular/router";
import Torneo from '../../../model/torneo';
import { TorneoService } from '../../../service/torneo-service/torneo-service';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-torneo-list',
  imports: [CommonModule, RouterModule, TranslocoPipe],
  templateUrl: './torneo-list-admin.html',
  styleUrl: './torneo-list-admin.css',
})
export class TorneoListAdmin implements OnInit{

    torneos: Torneo[] = [];

  constructor(private torneoService: TorneoService,
              private router: Router,
              private location: Location
  ) {}

  ngOnInit(): void {
    this.cargarTorneo();
  }

  cargarTorneo(): void {

    this.torneoService.getTorneo().subscribe(data => {
      console.log(data)
      this.torneos = data});
  }

  deleteTorneo(id: string): void {
  
      this.torneoService.deleteTorneo(id).subscribe(() => {this.cargarTorneo(),
        alert("Torneo eliminado");
      });
    
  }

  verEquipos(torneoId: string) {
    this.router.navigate(['/equipos-admin', torneoId]);
  }

    goBack(): void {
    this.location.back();
  }
  
}