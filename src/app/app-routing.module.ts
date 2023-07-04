import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FurgoneComponent } from './components/furgone/furgone.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ConsegnaComponent } from './components/consegna/consegna.component';
import { StatoConsegnaComponent } from './components/statoconsegna/statoconsegna.component';
import { IndirizzoComponent } from './components/indirizzo/indirizzo.component';
import { RuoloComponent } from './components/ruolo/ruolo.component';
import { PaccoComponent } from './components/pacco/pacco.component';
import { LoginComponent } from './components/login/login.component';
import { CallbackComponent } from './components/callback/callback.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { AuthenticationService } from './services/auth.service';
import { AdminGuard } from './services/adminguard.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  { path: 'callback', component: CallbackComponent, canActivate: [] },
  {
    path: 'furgone',
    component: FurgoneComponent,
    canActivate: [AuthenticationService, AdminGuard],
  },
  {
    path: 'cliente',
    component: ClienteComponent,
    canActivate: [AuthenticationService, AdminGuard],
  },
  {
    path: 'consegna',
    component: ConsegnaComponent,
    canActivate: [AuthenticationService, AuthGuard],
  },
  {
    path: 'stato_consegna',
    component: StatoConsegnaComponent,
    canActivate: [AuthenticationService, AdminGuard],
  },
  {
    path: 'ruolo',
    component: RuoloComponent,
    canActivate: [AuthenticationService, AdminGuard],
  },
  {
    path: 'indirizzo',
    component: IndirizzoComponent,
    canActivate: [AuthenticationService, AdminGuard],
  },
  {
    path: 'pacco',
    component: PaccoComponent,
    canActivate: [AuthenticationService, AdminGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'dashboard',
    component: SidebarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
