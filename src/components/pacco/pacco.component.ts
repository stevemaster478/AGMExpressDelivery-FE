import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pacco } from '../../models/pacco.model';
import { PaccoService } from '../../services/pacco.service';
=======
import { Pacco } from 'src/models/pacco.model';
>>>>>>> 431363a72234d24da3e23d62b58bfef94429384d

@Component({
  selector: 'app-pacco',
  templateUrl: './pacco.component.html',
<<<<<<< HEAD
  styleUrls: ['./pacco.component.css'],
})
export class PaccoComponent implements OnInit {
  pacchi: Pacco[] = [];
  paccoForm: FormGroup = this.createPaccoForm();
  isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private paccoService: PaccoService
  ) {}

  ngOnInit(): void {
    this.getPacchi();
  }

  getPacchi(): void {
    this.paccoService.getPacchi().subscribe((pacchi) => (this.pacchi = pacchi));
  }

  createPaccoForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      id_mittente: [null, Validators.required],
      id_destinatario: [null, Validators.required],
      peso: [null, Validators.required],
      profondita: [null, Validators.required],
      larghezza: [null, Validators.required],
      altezza: [null, Validators.required],
      tipo: [null, Validators.required],
      stato: [null, Validators.required],
      trackingCode: [null, Validators.required],
    });
  }

  submitPaccoForm(): void {
    if (this.paccoForm.valid) {
      const pacco: Pacco = this.paccoForm.value;
      if (this.isEditing) {
        this.updatePacco(pacco);
      } else {
        this.createPacco(pacco);
      }
    }
  }

  createPacco(pacco: Pacco): void {
    this.paccoService.createPacco(pacco).subscribe((newPacco) => {
      this.pacchi.push(newPacco);
      this.resetPaccoForm();
    });
  }

  updatePacco(pacco: Pacco): void {
    const id = pacco.id;
    this.paccoService.updatePacco(id, pacco).subscribe((updatedPacco) => {
      const index = this.pacchi.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.pacchi[index] = updatedPacco;
      }
      this.resetPaccoForm();
    });
  }

  editPacco(pacco: Pacco): void {
    this.isEditing = true;
    this.paccoForm.patchValue(pacco);
  }

  deletePacco(id: number): void {
    this.paccoService.deletePacco(id).subscribe(() => {
      this.pacchi = this.pacchi.filter((p) => p.id !== id);
    });
  }

  resetPaccoForm(): void {
    this.isEditing = false;
    this.paccoForm.reset();
  }
=======
  styleUrls: ['./pacco.component.css']
})
export class PaccoComponent implements OnInit {
  ngOnInit() {
    pacchi: Pacco[] = [];
  }

>>>>>>> 431363a72234d24da3e23d62b58bfef94429384d
}
