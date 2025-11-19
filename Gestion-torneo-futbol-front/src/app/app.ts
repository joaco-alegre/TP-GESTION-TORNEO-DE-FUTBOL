import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as AOS from 'aos';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit{
  protected readonly title = signal('Goal Manager');

ngOnInit(): void {
    AOS.init({
      duration: 1000, 
      once: false 
    });
  }

}

