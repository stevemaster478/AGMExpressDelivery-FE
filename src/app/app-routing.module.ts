import { MainpageComponent } from './components/Homepage/mainpage/mainpage.component';
import { UserDashboardComponent } from './components/dashboards/user-dashboard/user-dashboard.component';
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

const routes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'furgone', component: FurgoneComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'consegna', component: ConsegnaComponent },
  { path: 'stato_consegna', component: StatoConsegnaComponent },
  { path: 'ruolo', component: RuoloComponent },
  { path: 'indirizzo', component: IndirizzoComponent },
  { path: 'pacco', component: PaccoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'mainpage', component: MainpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
