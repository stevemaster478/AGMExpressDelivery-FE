import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  template: ` <div>Caricamento...</div> `,
})
export class CallbackComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.handleRedirectCallback().subscribe(
      () => {
        // Ottenere il ruolo dell'utente dai claims del token
        this.auth.idTokenClaims$.subscribe((claims) => {
          const userRole = claims && claims['role'];

          // Reindirizzare l'utente alla dashboard corretta in base al ruolo
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
              // Reindirizzare l'utente alla pagina di accesso se il ruolo non è valido o non è presente
              this.router.navigate(['/login']);
              break;
          }
        });
      },
      (error) => {
        // Gestire l'errore durante l'autenticazione
        console.error("Errore durante l'autenticazione: ", error);
      }
    );
  }
}
