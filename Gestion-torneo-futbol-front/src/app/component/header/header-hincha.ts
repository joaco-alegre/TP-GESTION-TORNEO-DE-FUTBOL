import { Component, Inject, HostListener, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header-hincha',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbCollapseModule, TranslocoPipe],
  templateUrl: './header-hincha.html',
  styleUrls: ['./header-hincha.css'],
})
export class HeaderHincha implements OnInit {
  
  isScrolled = false;
  isMenuCollapsed = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.isScrolled = window.scrollY > 10;
    this.document.body.classList.toggle('header-scrolled', this.isScrolled);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
    this.document.body.classList.toggle('header-scrolled', this.isScrolled);
  }

  cambiarIdioma(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  toggleDarkMode(): void {
    this.document.body.classList.toggle('dark-mode');
  }

goTo(section: string) {
  this.router.navigate(['/'], { fragment: section });
  this.isMenuCollapsed = true;
}
}