import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../../core/services/ticket.service';
import { AuthService } from '../../../core/services/auth.service';
import { TicketResponse } from '../../../core/models/ticket.model';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './ticket-list.component.html'
})
export class TicketListComponent implements OnInit {
  tickets: TicketResponse[] = [];
  filtered: TicketResponse[] = [];
  loading = true;
  filtroEstado = '';
  filtroPrioridad = '';
  busqueda = '';

  constructor(public auth: AuthService, private ticketSvc: TicketService) {}

  ngOnInit() {
    const obs = this.auth.isTecnico()
      ? this.ticketSvc.listarTodos()
      : this.ticketSvc.listarMisTickets();
    obs.subscribe({ next: t => { this.tickets = t; this.applyFilter(); this.loading = false; }, error: () => this.loading = false });
  }

  applyFilter() {
    this.filtered = this.tickets.filter(t =>
      (!this.filtroEstado    || t.estado    === this.filtroEstado) &&
      (!this.filtroPrioridad || t.prioridad === this.filtroPrioridad) &&
      (!this.busqueda        || t.titulo.toLowerCase().includes(this.busqueda.toLowerCase()) || t.categoria.toLowerCase().includes(this.busqueda.toLowerCase()))
    );
  }

  clearFilters() { this.filtroEstado = ''; this.filtroPrioridad = ''; this.busqueda = ''; this.applyFilter(); }
}
