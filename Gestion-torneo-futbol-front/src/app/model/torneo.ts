export default interface Torneo{
  id?: string;
  nombre: string;
  fechaInicio: Date;
  fechaFin: Date;
  estadoTorneo: string;
  logo: string;          
  ultimoCampeon?: string;
}