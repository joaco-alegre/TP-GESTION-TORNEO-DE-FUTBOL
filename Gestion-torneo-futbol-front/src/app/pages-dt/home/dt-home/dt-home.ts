import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import DT from '../../../model/dt';
import { TranslocoPipe } from '@ngneat/transloco';
import { DtService } from '../../../service/dt-service/dt-service';

@Component({
  selector: 'app-dt-home',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './dt-home.html',
  styleUrl: './dt-home.css',
})
export class DtHome implements OnInit{
  
    IDgenerico: string = 'dt-mg-001';

    dtId:string | null = null;
    dtData: any;

    constructor(private dtService: DtService,
      private route: ActivatedRoute
    ) {}

    ngOnInit(): void {

      this.dtId = this.route.snapshot.paramMap.get('id');

    if (this.dtId) {
      console.log('DT ID recibido:', this.dtId);
      
      this.dtService.geDtById(this.dtId).subscribe(data => {
        this.dtData = data;
      });

    } else {
      console.error('No se recibió el ID del DT en la URL.');

    }
  }
  }


