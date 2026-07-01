import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TicketService } from '../../../core/services/ticket.service';
import { CategoriaService } from '../../../core/services/categoria.service';
import { Categoria } from '../../../core/models/categoria.model';

@Component({
  selector: 'app-ticket-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './ticket-create.component.html'
})
export class TicketCreateComponent implements OnInit {
  private ticketSvc = inject(TicketService);
  private catSvc = inject(CategoriaService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  categorias: Categoria[] = [];
  error = ''; loading = false;

  form = this.fb.group({
    titulo:      ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    categoriaId: [null as number | null, Validators.required],
    descripcion: ['', [Validators.required, Validators.minLength(10)]]
  });

  ngOnInit() { this.catSvc.listarTodas().subscribe(c => this.categorias = c); }

  get titulo()      { return this.form.get('titulo')!; }
  get categoriaId() { return this.form.get('categoriaId')!; }
  get descripcion() { return this.form.get('descripcion')!; }

  get categoriaSeleccionada(): Categoria | null {
    const id = this.categoriaId.value;
    return id ? (this.categorias.find(c => c.id === +id) ?? null) : null;
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.error = ''; this.loading = true;
    const { titulo, descripcion, categoriaId } = this.form.value;
    this.ticketSvc.crear({ titulo: titulo!, descripcion: descripcion!, categoriaId: categoriaId! }).subscribe({
      next: t => this.router.navigate(['/tickets', t.id]),
      error: () => { this.error = 'Error al crear el ticket'; this.loading = false; }
    });
  }
}
