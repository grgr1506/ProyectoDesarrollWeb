import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private api = '/api/usuarios';

  constructor(private http: HttpClient) {}

  listarTodos() { return this.http.get<Usuario[]>(this.api); }
  eliminar(id: number) { return this.http.delete(`${this.api}/${id}`); }
}
