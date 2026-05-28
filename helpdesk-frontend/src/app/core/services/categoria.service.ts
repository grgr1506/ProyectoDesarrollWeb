import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria, CategoriaDTO } from '../models/categoria.model';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private api = '/api/categorias';

  constructor(private http: HttpClient) {}

  listarTodas()                      { return this.http.get<Categoria[]>(this.api); }
  crear(dto: CategoriaDTO)           { return this.http.post<Categoria>(this.api, dto); }
  actualizar(id: number, dto: CategoriaDTO) { return this.http.put<Categoria>(`${this.api}/${id}`, dto); }
  eliminar(id: number)               { return this.http.delete(`${this.api}/${id}`); }
}
