import { CommonModule } from '@angular/common';
import { Component, DOCUMENT, HostListener, Inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { AuthService } from '../../../service/auth-service/auth-service';

@Component({
  selector: 'app-header-admin',
  imports: [ CommonModule, NgbCollapseModule, TranslocoPipe],
  templateUrl: './header-admin.html',
  styleUrl: './header-admin.css',
})
export class HeaderAdmin {

  
    constructor(@Inject(DOCUMENT) private document: Document,
                private translocoService: TranslocoService,
                private router: Router,
                private authService: AuthService) {}

  isScrolled = false;

  
  public isMenuCollapsed = true;

  @HostListener('window:scroll', [])
  onWindowScroll() {

    if (window.scrollY > 10) {
      this.isScrolled = true;
    } else {

      this.isScrolled = false;
    }
  }

  menuVisible = false;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  cambiarIdioma(lang: string) {
    this.translocoService.setActiveLang(lang);
  }


  toggleDarkMode(): void {

    this.document.body.classList.toggle('dark-mode');
    this.isMenuCollapsed = true;

  }

 goTo(section: string) {
    this.router.navigate(['/']).then(() => {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  logout(): void {
    if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      this.authService.logout(); 
      this.router.navigate(['/es/inicio-sesion']);
    }
  }

}
