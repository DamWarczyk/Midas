import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {throwPortalOutletAlreadyDisposedError} from "@angular/cdk/portal/portal-errors";
import {AuthService} from "./servis/auth.service";

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  hasRole(role: string): boolean {
    return this.auth.user?.roles.includes(role) || false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAdmin = this.hasRole('ROLE_ADMIN')
    if(isAdmin){
      return true
    }
    else {
      this.router.navigate([''])
      return false
    }
  }

}
