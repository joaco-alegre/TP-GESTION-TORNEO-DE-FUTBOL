import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./component/header/header";
import { Footer } from "./component/footer/footer";
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit{
  protected readonly title = signal('Goal Manager');

ngAfterViewInit(): void {
    setTimeout(() => {
      AOS.init({
        duration: 1000, 
        once: false      
      });
    }, 100); 
  }

}

