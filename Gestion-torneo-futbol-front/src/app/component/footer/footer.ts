import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-footer',
  imports: [TranslocoPipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

    
}