import { Component } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-footer-admin',
  imports: [TranslocoPipe],
  templateUrl: './footer-admin.html',
  styleUrl: './footer-admin.css',
})
export class FooterAdmin {

}
