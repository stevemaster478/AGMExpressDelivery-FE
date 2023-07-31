import { RouterOutletResizingService } from './services/router-outlet-resizing.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
<<<<<<< HEAD
  collapsed = false;

  onCollapsedChange(collapsed: boolean): void {
    this.collapsed = collapsed;
  }

  constructor(private auth: AuthenticationService) {}
=======

  collapsed: Boolean = this.resizingService.collapsed;


  constructor( private auth: AuthenticationService, private resizingService: RouterOutletResizingService) {}




>>>>>>> ac3211d120c7e14ebcdf82bad8b7f9ff4f7ac9f1

  ngOnInit(): void {
    // Controllo se l'utente è autenticato
    this.auth.isAuthenticated().subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        // L'utente non è autenticato, reindirizzo alla pagina di accesso
        // this.auth.login();
      }
    });


  }


}
