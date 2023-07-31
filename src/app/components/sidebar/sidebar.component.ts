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

  constructor(private auth: AuthenticationService, private router: Router) {}

  @Output() onTogglesidebar: EventEmitter<SidebarToggle> = new EventEmitter();
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
      this.onTogglesidebar.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.setThemeClass();
    this.collapsed = true;

    if (this.ruoloLoggato.ruolo == 'admin') {
      this.navData = navbarAdmin;
    } else if (this.ruoloLoggato.ruolo== 'user') {
      this.navData = navbarCliente;
    }
  }

  toggleCollapse(): void {
    this.collapsed = true;
    this.onTogglesidebar.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  logout(): void {
    this.collapsed = false;
    this.auth.logout();
  }

  switchTheme(): void {
    this.darkTheme = !this.darkTheme;
    this.setThemeClass();
  }

  closesidebar(): void {
    this.collapsed = false;
    this.onTogglesidebar.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
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
