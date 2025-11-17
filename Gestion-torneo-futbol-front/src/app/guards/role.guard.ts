import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth-service/auth-service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles'] || [];
    const token = this.auth.getToken();
    const role = this.auth.getRole();

    if (!token) {
      this.router.navigate(['/es/inicio-sesion']);
      return false;
    }

    if (!expectedRoles || expectedRoles.length === 0) return true;

    if (role && expectedRoles.includes(role)) return true;

    // not authorized for this role
    this.router.navigate(['/es/inicio-sesion']);
    return false;
  }
}
