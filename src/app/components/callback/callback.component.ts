import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { RuoloService } from 'src/app/services/ruolo.service';
import { Ruolo } from 'src/app/models/ruolo.model';

@Component({
  selector: 'app-callback',
  template: ` <div>Caricamento...</div> `,
})
export class CallbackComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private ruoloService: RuoloService
  ) {}

  ngOnInit(): void {
    this.auth.handleRedirectCallback().subscribe(() => {
      const ruolo: Ruolo = {
        id: 1, // ID del ruolo utente
        nome: 'utente', // Nome del ruolo utente
      };
      this.ruoloService.createRuolo(ruolo).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    });
  }
}
