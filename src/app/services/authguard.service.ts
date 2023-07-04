import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthGuard implements CanActivate {
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
              if (userRole === 'utente') {
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
