import Usuario from "./usuario";

export default interface DT{
  id?: number;
  nombre: string;
  fechaNacimiento: Date;
  equipoID?: number;
  estiloJuego: string,
  usuario: Usuario;
  foto:string;
  contrasenia: string;
}