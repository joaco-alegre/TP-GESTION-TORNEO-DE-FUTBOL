import { CommonModule, NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, NgbCollapseModule, TranslocoPipe],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

    constructor(private translocoService: TranslocoService) {}

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

}
