import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from "@angular/router";
import Torneo from '../../../model/torneo';
import { TorneoService } from '../../../service/torneo-service/torneo-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-torneo-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './torneo-list-admin.html',
  styleUrl: './torneo-list-admin.css',
})
export class TorneoListAdmin implements OnInit{

    torneos: Torneo[] = [];

  constructor(private torneoService: TorneoService,
              private router: Router
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
  
      this.torneoService.deleteTorneo(id).subscribe(() => this.cargarTorneo());
    
  }

  verEquipos(torneoId: string) {
    this.router.navigate(['/equipos-admin', torneoId]);
  }

  

}
