import { Component, OnInit } from '@angular/core';
import Usuario from '../../../model/usuario';
import { UsuarioService } from '../../../service/usuario-service/usuario-service';
import { RouterLink } from "@angular/router";
import { CommonModule, Location} from '@angular/common';

@Component({
  selector: 'app-usuario-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.css',
})
export class UsuarioList implements OnInit{

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

    goBack(): void {
    this.location.back();
  }



}
