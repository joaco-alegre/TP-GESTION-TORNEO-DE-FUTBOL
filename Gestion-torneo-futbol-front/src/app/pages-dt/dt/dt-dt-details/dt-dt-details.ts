import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import { DtService } from '../../../service/dt-service/dt-service';
import DT from '../../../model/dt';

@Component({
  selector: 'app-dt-dt-details',
  imports: [CommonModule, RouterModule, TranslocoPipe],
  templateUrl: './dt-dt-details.html',
  styleUrl: './dt-dt-details.css',
})
export class DtDtDetails implements OnInit{

  dt?: DT;
  loggedInDtId = 'dt-mg-001'; 

  constructor(
    private dtService: DtService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (this.loggedInDtId) {
      this.dtService.geDtById(this.loggedInDtId).subscribe({
        next: (data) => {
          this.dt = data;
        },
        error: (err) => {
          console.error("No se pudo cargar el perfil del DT:", err);
          alert("Error al cargar el perfil. Serás redirigido.");
          this.router.navigate(['/dt-home']); 
        }
      });
    }
  }


  deleteDT(): void {
    if (!this.dt || !this.dt.id) return;

    if (confirm("¿Estás seguro de que deseas ELIMINAR tu propia cuenta? Esta acción no se puede deshacer.")) {
      
      this.dtService.deleteDt(this.dt.id).subscribe({
        next: () => {
          alert("Cuenta eliminada.");
          this.router.navigate(['/es/inicio-sesion']);
        },
        error: (e) => {
          console.error(e);
          alert("Error al eliminar la cuenta.");
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
