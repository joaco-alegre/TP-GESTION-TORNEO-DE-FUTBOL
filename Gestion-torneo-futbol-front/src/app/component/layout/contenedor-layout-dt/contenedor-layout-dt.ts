import { Component } from '@angular/core';
import { FooterDt } from '../footer-dt/footer-dt';
import { HeaderDt } from '../header-dt/header-dt';
import { RouterModule } from "@angular/router";


@Component({
  selector: 'app-contenedor-layout-dt',
  imports: [FooterDt, HeaderDt, RouterModule],
  templateUrl: './contenedor-layout-dt.html',
  styleUrl: './contenedor-layout-dt.css',
})
export class ContenedorLayoutDt {

}
