import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.isAuthenticated().pipe(
      switchMap((isAuthenticated) => {
        if (isAuthenticated) {
          return this.auth.userRole$.pipe(
            map((userRole) => {
              if (userRole === 'amministratore') {
                return true;
              } else {
                this.router.navigate(['/unauthorized']);
                return false;
              }
            })
          );
        } else {
          this.auth.login();
          return of(false);
        }
      })
    );
  }
}
