import { Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IdToken, LogoutOptions } from '@auth0/auth0-spa-js';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  public userRole$: Observable<string | null> =
    this.userRoleSubject.asObservable();

  constructor(private auth: AuthService, private router: Router) {
    this.auth.user$.subscribe((user: User | null | undefined) => {
      if (user) {
        this.setUserRoleFromToken(user['idToken']);
      }
    });
;
  }

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({ returnTo: window.location.origin } as LogoutOptions);
    this.setUserRole(null);
  }

  private setUserRoleFromToken(token: IdToken): void {
    const userRole = this.decodeTokenAndGetUserRole(token);
    this.setUserRole(userRole);
    this.redirectToDashboardByUserRole(userRole);
  }

  private setUserRole(userRole: string | null): void {
    this.userRoleSubject.next(userRole);
  }

  private decodeTokenAndGetUserRole(token: IdToken): string | null {
    // Decodifica il token per ottenere le informazioni sull'utente e restituisci il ruolo dell'utente
    // Implementa la logica appropriata per decodificare il token e ottenere il ruolo dell'utente
    const userRole = token['role'];
    return userRole || null;
  }

  private redirectToDashboardByUserRole(userRole: string | null): void {
    switch (userRole) {
      case 'admin':
        this.router.navigate(['/admin-dashboard']);
        break;
      case 'user':
        this.router.navigate(['/user-dashboard']);
        break;
      case 'delivery-person':
        this.router.navigate(['/delivery-dashboard']);
        break;
      default:
        this.router.navigate(['/login']);
        break;
    }
  }
}
