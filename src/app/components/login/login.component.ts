import { RuoloService } from './../../services/ruolo.service';
import { ClienteService } from './../../services/cliente.service';
import { Ruolo } from './../../models/ruolo.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private clienteService: ClienteService,
    private ruoloService: RuoloService
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$
      .pipe(
        map((isAuthenticated) => {
          if (isAuthenticated) {
            this.fetchUserRoleFromBackend().subscribe(
              (userRole) => {
                if (userRole) {
                  localStorage.setItem('userRole', userRole.nome);
                  this.redirectToDashboardByUserRole(userRole.nome);
                } else {
                  // Il ruolo utente non è stato trovato, esegui il logout
                  this.authService.logout({
                    returnTo: window.location.origin,
                  } as any);
                }
              },
              (error) => {
                console.error(error);
                // Gestisci l'errore durante l'ottenimento del ruolo utente dal backend
                this.authService.logout({
                  returnTo: window.location.origin,
                } as any);
              }
            );
          } else {
            // L'utente non è autenticato, reindirizza al form di login di Auth0
            this.authService.loginWithRedirect();
          }
        })
      )
      .subscribe();
  }

  private fetchUserRoleFromBackend(): Observable<Ruolo | null> {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const userIdNumber = parseInt(userId, 10); // Conversione da stringa a numero
      return this.clienteService.getRuoloByClienteId(userIdNumber);
    } else {
      return of(null); // Restituisci un observable con valore null se l'ID utente non è presente
    }
  }

  private redirectToDashboardByUserRole(userRole: string): void {
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
        // Ruolo sconosciuto, esegui il logout
        this.authService.logout({ returnTo: window.location.origin } as any);
        break;
    }
  }
}
