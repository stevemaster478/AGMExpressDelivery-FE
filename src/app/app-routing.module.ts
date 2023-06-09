import { IndirizzoComponent } from './../components/indirizzo/indirizzo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FurgoneComponent } from 'src/components/furgone/furgone.component';
import { ClienteComponent } from 'src/components/cliente/cliente.component';
import { ConsegnaComponent } from 'src/components/consegna/consegna.component';
import { StatoConsegnaComponent } from 'src/components/statoconsegna/statoconsegna.component';
import { RuoloComponent } from 'src/components/ruolo/ruolo.component';
import { PaccoComponent } from 'src/components/pacco/pacco.component';

const routes: Routes = [
  { path: 'furgone', component: FurgoneComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'consegna', component: ConsegnaComponent },
  { path: 'stato_consegna', component: StatoConsegnaComponent },
  { path: 'ruolo', component: RuoloComponent },
  { path: 'indirizzo', component: IndirizzoComponent },
  { path: 'pacco', component: PaccoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
