import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FurgoneComponent } from './components/furgone/furgone.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ConsegnaComponent } from './components/consegna/consegna.component';
import { StatoConsegnaComponent } from './components/statoconsegna/statoconsegna.component';
import { RuoloComponent } from './components/ruolo/ruolo.component';
import { IndirizzoComponent } from './components/indirizzo/indirizzo.component';
import { PaccoComponent } from './components/pacco/pacco.component';
import { AuthModule } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    FurgoneComponent,
    ClienteComponent,
    ConsegnaComponent,
    StatoConsegnaComponent,
    RuoloComponent,
    IndirizzoComponent,
    PaccoComponent,
    DashboardComponent,
    LoginComponent,
  ],
  imports: [
    AuthModule.forRoot({
      domain: 'agmexpress.eu.auth0.com',
      clientId: 'dKUca8YM6aoH5Eg2Zdl2DOW5tsZJgT'
    }),

    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
