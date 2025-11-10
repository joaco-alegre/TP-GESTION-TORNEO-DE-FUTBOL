import { Component } from '@angular/core';
import Usuario from '../../../model/usuario';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-usuario-home',
  imports: [RouterLink],
  templateUrl: './usuario-home.html',
  styleUrl: './usuario-home.css',
})
export class UsuarioHome {

  usuario!: Usuario;

}
