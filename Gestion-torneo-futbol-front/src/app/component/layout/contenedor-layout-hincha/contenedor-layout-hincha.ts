import { Component } from '@angular/core';
import { FooterHincha } from '../../footer/footer-hincha';
import { HeaderHincha } from '../../header/header-hincha';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contenedor-layout-hincha',
  imports: [FooterHincha, HeaderHincha, RouterModule, CommonModule],
  templateUrl: './contenedor-layout-hincha.html',
  styleUrl: './contenedor-layout-hincha.css',
})
export class ContenedorLayoutHincha {

}
