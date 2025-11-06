import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  
  


}
