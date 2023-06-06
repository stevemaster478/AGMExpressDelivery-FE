import { Consegna } from "./consegna.model";
import { Cliente } from './cliente.model';

export interface Pacco {
  id: number;
  id_mittente: number;
  id_destinatario: number;
  peso: number;
  profondita: number;
  larghezza: number;
  altezza: number;
  tipo: string;
  stato: string;
  trackingCode: string;
  consegne: Consegna[];
  mittente: Cliente;
  destinatario: Cliente;
}
