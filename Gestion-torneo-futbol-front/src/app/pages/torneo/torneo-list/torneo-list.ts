import { Component, OnInit } from '@angular/core';
import Torneo from '../../../model/torneo';
import { TorneoService } from '../../../service/torneo-service/torneo-service';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-torneo-list',
  imports: [CommonModule, RouterModule, TranslocoPipe],
  templateUrl: './torneo-list.html',
  styleUrl: './torneo-list.css'
})
export class TorneoList implements OnInit{

  
    torneos: Torneo[] = [];
  
    constructor(private torneoService: TorneoService,
      private location: Location
    ) {}
  
    ngOnInit(): void {
      this.getTorneos();
    }
  
    getTorneos(): void {
      this.torneoService.getTorneo().subscribe(data => {
        console.log(data)
        this.torneos = data});
    }
  
        goBack(): void {
    this.location.back();
  }

    
    

}
