export default interface Torneo{
  id?: number;
  nombre: string;
  fechaInicio: Date;
  fechaFin: Date;
  estadoTorneo: string;
  logo?: string;          
  ultimoCampeon?: string;
}