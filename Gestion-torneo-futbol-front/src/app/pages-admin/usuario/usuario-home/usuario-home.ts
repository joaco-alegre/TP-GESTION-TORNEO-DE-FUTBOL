import { Component } from '@angular/core';
import Usuario from '../../../model/usuario';
import { RouterLink } from "@angular/router";
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-usuario-home',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './usuario-home.html',
  styleUrl: './usuario-home.css',
})
export class UsuarioHome {

  usuario!: Usuario;

  IDgenerico: string = 'u-001';

}
