import { Component, OnInit } from '@angular/core';
import Noticia from '../../../model/noticia';
import { NoticiaService } from '../../../service/noticia-service/noticia-service';
import { RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-noticia-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './noticia-list.html',
  styleUrl: './noticia-list.css',
})
export class NoticiaList implements OnInit{

  noticias: Noticia[] = [];

  constructor(private noticiaService: NoticiaService, private location: Location) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  cargarNoticias(): void {
    this.noticiaService.getNoticias().subscribe(data => {
      this.noticias = data.reverse(); 
    });
  }

  deleteNoticia(id: string): void {
    if (!confirm("¿Deseas eliminar esta noticia?")) return;

    this.noticiaService.deleteNoticia(id).subscribe(() => {
      const index = this.noticias.findIndex(n => n.id === id);
      if (index > -1) {
        this.noticias.splice(index, 1);
      }
      alert("Noticia eliminada");
    });
  }

    goBack(): void {
    this.location.back();
  }

}

