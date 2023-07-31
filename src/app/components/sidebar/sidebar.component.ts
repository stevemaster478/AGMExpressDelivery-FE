import { RouterOutletResizingService } from './../../services/router-outlet-resizing.service';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
} from '@angular/core';
import { navbarAdmin, navbarCliente } from './sidebar-data';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import {
  Cliente
} from 'src/app/models/cliente.model';
interface SidebarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate(
          '650ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
<<<<<<< HEAD
  ruoloLoggato: Ruolo = {
    id: 1, // 1 : ADMIN | 2: USER
    nome: 'pippo',
  };

=======
  ruoloLoggato: Cliente = {
    id: 1,
    nome: 'pippo',
    partitaIva: 1234567890,
    cognome: 'rossi',
    numeroTelefono: '1234567890',
    pacchiInviati: [],
    pacchiRicevuti: [],
    ruolo: 'admin',
  };

<<<<<<< HEAD
>>>>>>> ac3211d120c7e14ebcdf82bad8b7f9ff4f7ac9f1
  constructor(private auth: AuthenticationService, private router: Router) {}
=======

  constructor(private auth: AuthenticationService, private router: Router, private resizingService: RouterOutletResizingService) {}
>>>>>>> 09d254702189a64e75d8c7b72bdbfdf71e649e33

  @Output() collapsedChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  collapsed = false;
  screenWidth = 0;
  navData: any;
  darkTheme = true;
  sidebarThemeClass = '';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
<<<<<<< HEAD
      this.collapsedChange.emit(this.collapsed);
=======
      this.onTogglesidebar.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
      this.resizingService.collapsed = this.collapsed;

>>>>>>> ac3211d120c7e14ebcdf82bad8b7f9ff4f7ac9f1
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.setThemeClass();
    this.collapsed = true;

<<<<<<< HEAD
    if (this.ruoloLoggato.ruolo == 'admin') {
=======
    this.resizingService.collapsed = this.collapsed;

    if (this.ruoloLoggato.id == 1) {
>>>>>>> 09d254702189a64e75d8c7b72bdbfdf71e649e33
      this.navData = navbarAdmin;
<<<<<<< HEAD
    } else if (this.ruoloLoggato.id == 2) {
=======
    } else if (this.ruoloLoggato.ruolo== 'user') {
>>>>>>> ac3211d120c7e14ebcdf82bad8b7f9ff4f7ac9f1
      this.navData = navbarCliente;
    }
  }

  toggleCollapse(): void {
<<<<<<< HEAD
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
=======
    this.collapsed = true;
    this.onTogglesidebar.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
    this.resizingService.collapsed = this.collapsed;


>>>>>>> ac3211d120c7e14ebcdf82bad8b7f9ff4f7ac9f1
  }

  logout(): void {
    this.collapsed = false;
    this.resizingService.collapsed = this.collapsed;
    this.auth.logout();
  }

  switchTheme(): void {
    this.darkTheme = !this.darkTheme;
    this.setThemeClass();
  }

  closesidebar(): void {
    this.collapsed = false;
<<<<<<< HEAD
    this.collapsedChange.emit(this.collapsed);
=======
    this.onTogglesidebar.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
    this.resizingService.collapsed = this.collapsed;

>>>>>>> ac3211d120c7e14ebcdf82bad8b7f9ff4f7ac9f1
  }

  private setThemeClass(): void {
    const body = document.getElementsByTagName('body')[0];
    if (this.darkTheme) {
      body.classList.add('dark-theme');
      this.sidebarThemeClass = 'dark-theme';
    } else {
      body.classList.remove('dark-theme');
      this.sidebarThemeClass = '';
    }
  }
}
