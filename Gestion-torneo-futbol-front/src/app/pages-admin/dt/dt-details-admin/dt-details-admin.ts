import { Component } from '@angular/core';
import { DtService } from '../../../service/dt-service/dt-service';
import { ActivatedRoute } from '@angular/router';
import DT from '../../../model/dt';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-dt-details-admin',
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './dt-details-admin.html',
  styleUrl: './dt-details-admin.css',
})
export class DtDetailsAdmin {

      dt?: DT;
  
    constructor(
      private dtService: DtService,
      private route: ActivatedRoute,
      private location: Location
    ) {}
  
    
    ngOnInit(): void {
      const id = this.route.snapshot.params['id'];
      this.dtService.geDtById(id).subscribe(data => this.dt = data);
    }

            goBack(): void {
    this.location.back();
  }


}
