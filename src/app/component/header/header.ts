import { CommonModule, NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  isScrolled = false;

  constructor(private auth: AuthService, private router: Router) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {

    if (window.scrollY > 10) {
      this.isScrolled = true;
    } else {

      this.isScrolled = false;
    }
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
