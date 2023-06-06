import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FurgoneComponent } from 'src/components/furgone/furgone.component';
import { HttpClientModule } from '@angular/common/http';
import { ClienteComponent } from 'src/components/cliente/cliente.component';
import { ConsegnaComponent } from 'src/components/consegna/consegna.component';
import { StatoConsegnaComponent } from 'src/components/statoconsegna/statoconsegna.component';

@NgModule({
  declarations: [
    AppComponent,
    FurgoneComponent,
    ClienteComponent,
    ConsegnaComponent,
    StatoConsegnaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}