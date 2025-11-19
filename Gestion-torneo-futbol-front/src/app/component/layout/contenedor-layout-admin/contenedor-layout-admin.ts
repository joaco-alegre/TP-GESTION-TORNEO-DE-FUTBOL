import { Component } from '@angular/core';
import { FooterAdmin } from '../footer-admin/footer-admin';
import { HeaderAdmin } from '../header-admin/header-admin';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-contenedor-layout-admin',
  imports: [FooterAdmin, HeaderAdmin, RouterModule],
  templateUrl: './contenedor-layout-admin.html',
  styleUrl: './contenedor-layout-admin.css',
})
export class ContenedorLayoutAdmin {




}
