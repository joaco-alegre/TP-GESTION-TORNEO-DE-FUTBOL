import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderHincha } from "./component/header/header-hincha";
import { FooterHincha } from "./component/footer/footer-hincha";
import * as AOS from 'aos';
import { HeaderAdmin } from './component/layout/header-admin/header-admin';
import { HeaderDt } from './component/layout/header-dt/header-dt';
import { FooterDt } from './component/layout/footer-dt/footer-dt';
import { FooterAdmin } from './component/layout/footer-admin/footer-admin';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderHincha, FooterHincha, HeaderAdmin, HeaderDt, FooterDt, FooterAdmin],
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

