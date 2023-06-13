import { Cliente } from './cliente.model'

export interface Indirizzo {
  id: number;
  via: string;
  cap: number;
  numeroCivico: number;
  interno: string;
  citta: string;
  cliente: Cliente;
}
