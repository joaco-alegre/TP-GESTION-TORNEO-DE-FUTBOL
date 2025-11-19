import { Component } from '@angular/core';
import { Footer } from '../../footer/footer';
import { Header } from '../../header/header';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contenedor-layout-hincha',
  imports: [Footer, Header, RouterModule, CommonModule],
  templateUrl: './contenedor-layout-hincha.html',
  styleUrl: './contenedor-layout-hincha.css',
})
export class ContenedorLayoutHincha {

}
