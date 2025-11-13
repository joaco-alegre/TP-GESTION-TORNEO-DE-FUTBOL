import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import DT from '../../../model/dt';

@Component({
  selector: 'app-dt-home',
  imports: [RouterLink],
  templateUrl: './dt-home.html',
  styleUrl: './dt-home.css',
})
export class DtHome {
  
    IDgenerico: string = 'dt-mg-001';

    dt?: DT;

}
