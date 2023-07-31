import { Pacco } from './pacco.model';
import { Ruolo } from './ruolo.model';

export interface Cliente {
  id: number;
  nome: string;
  partitaIva: number;
  cognome: string;
  numeroTelefono: string;
  pacchiInviati: Pacco[];
  pacchiRicevuti: Pacco[];
<<<<<<< HEAD
  ruolo: Ruolo;
=======
  ruolo: string;
>>>>>>> ac3211d120c7e14ebcdf82bad8b7f9ff4f7ac9f1
}

