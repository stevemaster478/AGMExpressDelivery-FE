import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthenticationService,
  ) {}

  ngOnInit(): void {
    // Controllo se l'utente è autenticato
    this.auth.isAuthenticated().subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        // L'utente non è autenticato, reindirizzo alla pagina di accesso
        this.auth.login();
      }
    });
  }
}
