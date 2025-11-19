import { CommonModule, NgClass } from '@angular/common';
import { Component, DOCUMENT, HostListener, Inject} from '@angular/core';
import { Route, Router, RouterLink } from "@angular/router";
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, NgbCollapseModule, TranslocoPipe],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
// export class Header {

//   isScrolled = false;
//   isMenuCollapsed = true;
//   menuVisible: boolean = false;

//     constructor(@Inject(DOCUMENT) private document: Document,
//                 private translocoService: TranslocoService,
//                 private router: Router) {}

// @HostListener('document:click', ['$event'])
//   onDocumentClick(event: MouseEvent): void {

//     if (this.menuVisible) { 
//       const targetElement = event.target as HTMLElement;
//       const menuDesplegable = document.getElementById('menu-desplegable');
//       const menuButton = document.querySelector('.navbar-toggler'); 

//       if (menuButton && menuDesplegable && 
//           !menuButton.contains(targetElement) && 
//           !menuDesplegable.contains(targetElement)) {
        
//         this.menuVisible = false;
//       }
//     }
//   }

//   toggleMenu() {
//     this.menuVisible = !this.menuVisible;
//   }

//   cambiarIdioma(lang: string) {
//     this.translocoService.setActiveLang(lang);
//   }


//   toggleDarkMode(): void {

//     this.document.body.classList.toggle('dark-mode');
//     this.isMenuCollapsed = true;

//   }

//  goTo(section: string) {
//     this.router.navigate(['/']).then(() => {
//       const el = document.getElementById(section);
//       if (el) {
//         el.scrollIntoView({ behavior: 'smooth' });
//       }
//     });
//   }

// }

export class Header {



    constructor(@Inject(DOCUMENT) private document: Document,

                private translocoService: TranslocoService,

                private router: Router) {}



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
}