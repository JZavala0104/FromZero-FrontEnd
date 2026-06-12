export class Usuarios {
  IdUser: number = 0;        // ← I mayúscula
  Username: string = '';     // ← U mayúscula
  nombre: string = '';
  email: string = '';
  password: string = '';
  fechaRegistro: Date = new Date();
  Habilitado: boolean = false;  // ← H mayúscula
  idRol: number = 0;
}