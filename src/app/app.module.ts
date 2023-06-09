import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FurgoneComponent } from 'src/components/furgone/furgone.component';
import { HttpClientModule } from '@angular/common/http';
import { ClienteComponent } from 'src/components/cliente/cliente.component';
import { ConsegnaComponent } from 'src/components/consegna/consegna.component';
import { StatoConsegnaComponent } from 'src/components/statoconsegna/statoconsegna.component';
import { RuoloComponent } from 'src/components/ruolo/ruolo.component';
import { IndirizzoComponent } from '../components/indirizzo/indirizzo.component';
import { PaccoComponent } from 'src/components/pacco/pacco.component';

@NgModule({
  declarations: [
    AppComponent,
    FurgoneComponent,
    ClienteComponent,
    ConsegnaComponent,
    StatoConsegnaComponent,
    RuoloComponent,
    IndirizzoComponent,
    PaccoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
