import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TicketService } from '../../core/services/ticket.service';
import { TicketResponse } from '../../core/models/ticket.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  tickets: TicketResponse[] = [];
  loading = true;

  get abiertos()    { return this.tickets.filter(t => t.estado === 'ABIERTO').length; }
  get enProgreso()  { return this.tickets.filter(t => t.estado === 'EN_PROGRESO').length; }
  get resueltos()   { return this.tickets.filter(t => t.estado === 'RESUELTO').length; }
  get alta()        { return this.tickets.filter(t => t.prioridad === 'ALTA' && t.estado !== 'RESUELTO' && t.estado !== 'CANCELADO').length; }
  get recientes()   { return [...this.tickets].sort((a,b) => b.id - a.id).slice(0, 5); }

  constructor(public auth: AuthService, private ticketSvc: TicketService) {}

  ngOnInit() {
    const obs = this.auth.isTecnico()
      ? this.ticketSvc.listarTodos()
      : this.ticketSvc.listarMisTickets();
    obs.subscribe({ next: t => { this.tickets = t; this.loading = false; }, error: () => this.loading = false });
  }
}
