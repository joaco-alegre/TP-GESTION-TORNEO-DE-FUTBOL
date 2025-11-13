import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Usuario from '../../../model/usuario';
import { UsuarioService } from '../../../service/usuario-service/usuario-service';

@Component({
  selector: 'app-usuario-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './usuario-details.html',
  styleUrl: './usuario-details.css',
})
export class UsuarioDetails implements OnInit{

  usuario?: Usuario;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {

    // 3. --- ¡AQUÍ ESTÁ LA SIMULACIÓN! ---
    // Fijamos el ID del admin que (simulamos) inició sesión.
    // Usamos 'u-001' (Joaquin) del JSON que me diste.
    const loggedInAdminId = 'u-001'; 

    if (loggedInAdminId) {
      this.usuarioService.getUsuarioById(loggedInAdminId).subscribe(data => {
        this.usuario = data;
      }, (error) => {
        console.error("No se pudo cargar el perfil del admin:", error);
      });
    }
  }


  deleteUsuario(): void {
    if (!this.usuario || !this.usuario.id) return;

    if (confirm("¿Estás seguro de que deseas ELIMINAR tu propia cuenta? Esta acción no se puede deshacer.")) {
      
      this.usuarioService.deleteUsuario(this.usuario.id).subscribe({
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

  //   deleteUsuario(id: string): void {
  //   if (!confirm("¿Deseas eliminar este administrador?")) return;

  //   this.usuarioService.deleteUsuario(id).subscribe(() => {

  //     const index = this.usuarios.findIndex(a => a.id === id);
  //     if (index > -1) {
  //       this.usuarios.splice(index, 1);
  //     }
  //     alert("Administrador eliminado");
  //   });
  // }

}
