import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-callback',
  template: `<div>Caricamento...</div>`,
})
export class CallbackComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.auth.redirectToDashboard();
  }
}
