import { Component, OnInit } from '@angular/core';
import { ContactoService } from '../../../service/contacto-service/contacto-service';
import { CommonModule, Location } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-panel-contacto',
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './panel-contacto.html',
  styleUrl: './panel-contacto.css',
})
export class PanelContacto implements OnInit{

  mensajes: any[] = [];
      currentUserId: string | null = null;
      private querySub: Subscription | undefined;

  constructor(private contactoService: ContactoService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {


    this.cargarMensajes();


                      this.querySub = this.route.queryParamMap.subscribe(params => {
        const idFromQuery = params.get('referrerId'); 
        
        if (idFromQuery) {
            this.currentUserId = idFromQuery;
            console.log('ID del usuario logueado recibido por Query Param:', this.currentUserId);
        }
    });


  }

  cargarMensajes(): void {
    this.contactoService.getMensajes().subscribe(data => {
      this.mensajes = data.reverse(); 
    });
  }

    goBack(): void {
    this.router.navigate(['/admin/usuario-home', this.currentUserId])
  }

}
