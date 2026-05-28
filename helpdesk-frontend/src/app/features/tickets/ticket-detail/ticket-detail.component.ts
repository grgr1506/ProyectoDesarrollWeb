import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TicketService } from '../../../core/services/ticket.service';
import { AuthService } from '../../../core/services/auth.service';
import { TicketResponse } from '../../../core/models/ticket.model';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ticket-detail.component.html'
})
export class TicketDetailComponent implements OnInit {
  ticket: TicketResponse | null = null;
  loading = true;
  error = '';
  successMsg = '';
  solucion = '';
  showResolverForm = false;

  constructor(
    public auth: AuthService,
    private ticketSvc: TicketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.load(id);
  }

  load(id: number) {
    this.ticketSvc.obtener(id).subscribe({
      next: t => { this.ticket = t; this.loading = false; },
      error: () => { this.error = 'No se pudo cargar el ticket'; this.loading = false; }
    });
  }

  asumir() {
    this.ticketSvc.asumir(this.ticket!.id).subscribe({
      next: t => { this.ticket = t; this.successMsg = 'Ticket asumido correctamente'; },
      error: e => this.error = e.error?.detail || 'Error al asumir ticket'
    });
  }

  resolver() {
    this.ticketSvc.resolver(this.ticket!.id, { nuevoEstado: 'RESUELTO', solucionAplicada: this.solucion }).subscribe({
      next: t => { this.ticket = t; this.showResolverForm = false; this.successMsg = 'Ticket resuelto exitosamente'; },
      error: e => this.error = e.error?.detail || 'Debe documentar la solución (RN02)'
    });
  }

  cancelar() {
    if (!confirm('¿Seguro que deseas cancelar este ticket?')) return;
    this.ticketSvc.cancelar(this.ticket!.id).subscribe({
      next: t => { this.ticket = t; this.successMsg = 'Ticket cancelado'; },
      error: e => this.error = e.error?.detail || 'Error al cancelar'
    });
  }

  eliminar() {
    if (!confirm('¿Eliminar permanentemente este ticket?')) return;
    this.ticketSvc.eliminar(this.ticket!.id).subscribe({
      next: () => history.back(),
      error: () => this.error = 'Error al eliminar'
    });
  }
}
