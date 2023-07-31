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
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { Ruolo } from 'src/app/models/ruolo.model';

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

  ruoloLoggato: Ruolo = {
    id: 1, // 1 : ADMIN | 2: USER
    nome: 'pippo'
  };


  constructor(private auth: AuthenticationService, private router: Router, private resizingService: RouterOutletResizingService) {}

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
      this.resizingService.collapsed = this.collapsed;

    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.setThemeClass();
    this.collapsed = true;

    this.resizingService.collapsed = this.collapsed;

    if (this.ruoloLoggato.id == 1) {
      this.navData = navbarAdmin;
    } else if (this.ruoloLoggato.id == 2){
      this.navData = navbarCliente;
    }
  }

  toggleCollapse(): void {
    this.collapsed = true;
    this.onTogglesidebar.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
    this.resizingService.collapsed = this.collapsed;


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
    this.onTogglesidebar.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
    this.resizingService.collapsed = this.collapsed;

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
