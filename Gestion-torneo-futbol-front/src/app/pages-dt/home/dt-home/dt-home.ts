import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
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

    dt?: DT;

    constructor(private dtService: DtService) {}

    ngOnInit(): void {
    if (this.dt?.id) {
      this.dtService.geDtById(this.dt.id).subscribe(data => {
        this.dt = data;
      });
    }
  }

}
