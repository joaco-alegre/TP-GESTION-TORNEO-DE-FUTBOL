import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth-service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class DtTeamGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user = this.authService.getUser();
    if (!user || user.role !== 'dt') {
        this.router.navigate(['/es/inicio-sesion']);
        return false;
    }
    return true; 
  }
}