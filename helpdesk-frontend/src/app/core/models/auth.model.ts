export interface LoginDTO { correo: string; password: string; }
export interface RegisterDTO { nombre: string; correo: string; password: string; rol: string; }
export interface JwtResponse { token: string; tipo: string; rol: string; id: number; nombre: string; }
