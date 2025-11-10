import { Component, OnInit } from '@angular/core';
import Torneo from '../../../model/torneo';
import { TorneoService } from '../../../service/torneo-service/torneo-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-torneo-details',
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './torneo-details-admin.html',
  styleUrl: './torneo-details-admin.css',
})
export class TorneoDetailsAdmin implements OnInit{

    torneo?: Torneo;

  constructor(
    private torneoService: TorneoService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.torneoService.getTorneoById(id).subscribe(data => this.torneo = data);
  }

        goBack(): void {
    this.location.back();
  }

}
