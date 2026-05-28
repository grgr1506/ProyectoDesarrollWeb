import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TicketService } from '../../../core/services/ticket.service';
import { CategoriaService } from '../../../core/services/categoria.service';
import { Categoria } from '../../../core/models/categoria.model';

@Component({
  selector: 'app-ticket-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ticket-create.component.html'
})
export class TicketCreateComponent implements OnInit {
  titulo = ''; descripcion = ''; categoriaId: number | null = null;
  categorias: Categoria[] = [];
  error = ''; loading = false;

  constructor(private ticketSvc: TicketService, private catSvc: CategoriaService, private router: Router) {}

  ngOnInit() { this.catSvc.listarTodas().subscribe(c => this.categorias = c); }

  submit() {
    if (!this.categoriaId) { this.error = 'Selecciona una categoría'; return; }
    this.error = ''; this.loading = true;
    this.ticketSvc.crear({ titulo: this.titulo, descripcion: this.descripcion, categoriaId: this.categoriaId }).subscribe({
      next: t => this.router.navigate(['/tickets', t.id]),
      error: () => { this.error = 'Error al crear el ticket'; this.loading = false; }
    });
  }
}
