import { Component, OnInit, Inject } from '@angular/core';
import { FurgoneService } from '../../services/furgone.service';
import { Furgone } from '../../models/furgone.model';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-furgone',
  templateUrl: './furgone.component.html',
  styleUrls: ['./furgone.component.css'],
})
export class FurgoneComponent implements OnInit {
  furgoni: Furgone[] = [];
  id: number = 0;
  modello: string = '';
  targa: string = '';
  capacita: number = 0;
  errorMessage: string = '';

  constructor(private furgoneService: FurgoneService) {}

  ngOnInit() {
    this.modello = '';
    this.targa = '';
    this.capacita = 0;
    this.getFurgoni();
  }

  getFurgoni(): void {
    this.furgoneService
      .getFurgoni()
      .pipe(
        catchError((error) => {
          this.errorMessage =
            'Si è verificato un errore durante il recupero dei furgoni.';
          return throwError(error);
        })
      )
      .subscribe((furgoni) => (this.furgoni = furgoni));
  }

  addFurgone(): void {
    this.targa = this.targa?.trim();
    this.modello = this.modello?.trim();
    if (!this.modello || !this.targa || !this.capacita) {
      return;
    }
    const newFurgone: Furgone = {
      id: this.id,
      targa: this.targa,
      capacita: this.capacita,
      modello: this.modello,
    };
    this.furgoneService.createFurgone(newFurgone).subscribe((furgone) => {
      this.furgoni.push(furgone);
    });
  }

  deleteFurgone(furgone: Furgone): void {
    this.furgoni = this.furgoni.filter((f) => f !== furgone);
    this.furgoneService.deleteFurgone(furgone.id).subscribe();
  }
}
