export interface UserDTO {
  idUsuario?: number;
  username: string;
  password?: string;
  email: string;
  roleuser: 'ADMINISTRADOR' | 'DT';
}
