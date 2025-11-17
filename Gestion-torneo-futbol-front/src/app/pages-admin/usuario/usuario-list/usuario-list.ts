import { Component, OnInit } from '@angular/core';
import Usuario from '../../../model/usuario';
import { UsuarioService } from '../../../service/usuario-service/usuario-service';
import { Router, RouterLink } from "@angular/router";
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
    private location: Location,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(data => {
      // Map backend ViewUserDTO -> frontend Usuario shape
      this.usuarios = data.map((u: any) => ({
        id: u.idUsuario,
        nombre: u.username,
        username: u.username,
        password: '',
        email: u.email,
        rolUser: u.roleuser,
        foto: u.foto || ''
      }));
    });
  }

    goBack(): void {
    this.location.back();
  }

    confirmDelete(id: number | undefined): void {
      if (!id) return;
      if (!confirm('¿Desea eliminar este usuario?')) return;
      this.usuarioService.deleteUsuario(id).subscribe({
        next: () => {
          alert('Usuario eliminado');
          this.cargarUsuarios();
        },
        error: (e) => {
          console.error(e);
          alert('Error al eliminar usuario');
        }
      });
    }



}
