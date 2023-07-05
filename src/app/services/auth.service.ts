import { Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  public userRole$: Observable<string | null> =
    this.userRoleSubject.asObservable();

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.auth.user$
      .pipe(
        tap((user: User | null | undefined) => {
          if (user) {
            this.setUserRoleFromToken(user);
            localStorage.setItem('access_token', user['idToken'] || ''); // Salva il token di accesso in localStorage
          }
        })
      )
      .subscribe();
  }

  canActivate(): Observable<boolean> {
    return this.isAuthenticated().pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          // this.redirectToDashboard();
          return false;
        }
        return true;
      })
    );
  }

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout();
    this.setUserRole(null);
    localStorage.removeItem('access_token'); // Rimuovi il token di accesso da localStorage al momento del logout
    this.auth.loginWithRedirect();
  }

  async setUserRoleFromToken(user: User | null | undefined): Promise<void> {
    if (user) {
      try {
        const userRole = await this.getUserRoleFromToken(user);
        this.setUserRole(userRole);
      } catch (error) {
        console.error('Errore durante il recupero del ruolo utente:', error);
      }
    }
  }

  async getUserRoleFromToken(user: User): Promise<string | null> {
    const token = user['idToken'];
    const code = this.extractCodeFromToken(token);
    const url = 'https://agmexpress.eu.auth0.com/oauth/token';

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('client_id', 'dKUca8YM6aoH5Eg2Zdl2DOW5tsZJgT4T');
    body.set(
      'client_secret',
      'ighBy3EkUiXASdIn_DGUKFseNEzLPYMgP41zOL2e-AlrtBT8tK-Luysu8PTWqDi8'
    );
    body.set('code', code);
    body.set('redirect_uri', 'https://localhost:4200/dashboard');

    try {
      const response = await this.http
        .post<any>(url, body.toString(), { headers })
        .toPromise();

      const accessToken = response.access_token;
      const refreshToken = response.refresh_token;
      const idToken = response.id_token;
      const tokenType = response.token_type;
      const expiresIn = response.expires_in;

      // Gestisci la risposta del token come necessario

      return 'utente'; // Sostituisci con il valore del ruolo utente ottenuto dalla risposta del token
    } catch (error) {
      console.error('Errore durante il recupero del ruolo utente:', error);
      throw error;
    }
  }

  private extractCodeFromToken(token: string): string {
    const tokenParts = token.split('.');
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      return payload.code;
    } else {
      throw new Error('Il token non contiene un code valido.');
    }
  }

  setUserRole(userRole: string | null): void {
    this.userRoleSubject.next(userRole);
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth.isAuthenticated$;
  }

  // redirectToDashboard(): void {
  //   const currentUrl = this.router.url;
  //   if (currentUrl !== '/dashboard' && currentUrl !== '') {
  //     this.router.navigate(['/dashboard']);
  //   }
  // }

  handleRedirectCallback(): void {
    this.auth.handleRedirectCallback().subscribe(() => {
      this.auth.idTokenClaims$.subscribe((claims) => {
        console.log('Informazioni utente:', claims); // Stampa le informazioni dell'utente nella console per scopi di testing
      });
      // this.redirectToDashboard();
    });
  }
}
