import { Pacco } from './pacco.model'

export interface Cliente {
  id: number;
  nome: string;
  partitaIva: number;
  cognome: string;
  numeroTelefono: string;
  pacchiInviati: Pacco[];
  pacchiRicevuti: Pacco[];
  ruolo: string;
}
