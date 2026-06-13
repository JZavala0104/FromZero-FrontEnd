export class Usuarios {
  idUser: number = 0;        // ← I mayúscula
  username: string = '';     // ← U mayúscula
  nombre: string = '';
  email: string = '';
  password: string = '';
  fechaRegistro: Date = new Date();
  habilitado: boolean = false;  // ← H mayúscula
  idRol: number = 0;
}