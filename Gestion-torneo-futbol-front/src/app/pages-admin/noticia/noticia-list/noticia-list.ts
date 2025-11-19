import { Component, OnInit } from '@angular/core';
import Noticia from '../../../model/noticia';
import { NoticiaService } from '../../../service/noticia-service/noticia-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-noticia-list',
  imports: [RouterModule, CommonModule, TranslocoPipe],
  templateUrl: './noticia-list.html',
  styleUrl: './noticia-list.css',
})
export class NoticiaList implements OnInit{

  noticias: Noticia[] = [];
    currentUserId: string | null = null;
    private querySub: Subscription | undefined;

  constructor(private noticiaService: NoticiaService, 
    private location: Location,
  private translocoService: TranslocoService,
private router: Router,
private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.cargarNoticias();

                  this.querySub = this.route.queryParamMap.subscribe(params => {
        const idFromQuery = params.get('referrerId'); 
        
        if (idFromQuery) {
            this.currentUserId = idFromQuery;
            console.log('ID del usuario logueado recibido por Query Param:', this.currentUserId);
        }
    });
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

  getTitulo(noticia: any): string {
    const lang = this.translocoService.getActiveLang(); // 'es' o 'en'
    return lang === 'en' ? noticia.tituloEn : noticia.tituloEs;
  }

    goBack(): void {
    this.router.navigate(['/admin/usuario-home', this.currentUserId])
  }

}

