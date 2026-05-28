import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CambioEstadoDTO, TicketRequest, TicketResponse } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private api = '/api/tickets';

  constructor(private http: HttpClient) {}

  listarTodos()            { return this.http.get<TicketResponse[]>(this.api); }
  listarMisTickets()       { return this.http.get<TicketResponse[]>(`${this.api}/mis-tickets`); }
  obtener(id: number)      { return this.http.get<TicketResponse>(`${this.api}/${id}`); }
  crear(dto: TicketRequest){ return this.http.post<TicketResponse>(this.api, dto); }
  actualizar(id: number, dto: TicketRequest) { return this.http.put<TicketResponse>(`${this.api}/${id}`, dto); }
  asumir(id: number)       { return this.http.patch<TicketResponse>(`${this.api}/${id}/asumir`, {}); }
  resolver(id: number, dto: CambioEstadoDTO) { return this.http.patch<TicketResponse>(`${this.api}/${id}/resolver`, dto); }
  cancelar(id: number)     { return this.http.patch<TicketResponse>(`${this.api}/${id}/cancelar`, {}); }
  eliminar(id: number)     { return this.http.delete(`${this.api}/${id}`); }
}
