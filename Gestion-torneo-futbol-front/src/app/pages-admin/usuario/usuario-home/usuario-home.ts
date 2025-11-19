import { Component, OnInit } from '@angular/core';
import Usuario from '../../../model/usuario';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-usuario-home',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './usuario-home.html',
  styleUrl: './usuario-home.css',
})
export class UsuarioHome implements OnInit{

  currentUserId: string | null = null;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

  this.currentUserId = this.route.snapshot.paramMap.get('id');

  if (!this.currentUserId) {
      console.error('Error: No se pudo obtener el ID del usuario de la URL.');
    }

}

}