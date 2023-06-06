import { StatoConsegna } from './statoconsegna.model';
import { Furgone } from "./furgone.model";
import { Pacco } from "./pacco.model";

export interface Consegna {
  id: number;
  inizioConsegnaData: string;
  fineConsegnaData: string;
  targa: string;
  idStatoConsegna: number;
  furgone: Furgone;
  statoConsegna: StatoConsegna;
  pacchi: Pacco[];
}
