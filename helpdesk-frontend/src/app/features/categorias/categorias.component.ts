import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../core/services/categoria.service';
import { Categoria } from '../../core/models/categoria.model';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  loading = true;
  error = ''; successMsg = '';
  editando: Categoria | null = null;
  form = { nombre: '', descripcion: '', requiereValidacionProveedor: false };
  showForm = false;

  constructor(private catSvc: CategoriaService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.catSvc.listarTodas().subscribe({ next: c => { this.categorias = c; this.loading = false; }, error: () => this.loading = false });
  }

  openNew() { this.editando = null; this.form = { nombre: '', descripcion: '', requiereValidacionProveedor: false }; this.showForm = true; }

  openEdit(c: Categoria) {
    this.editando = c;
    this.form = { nombre: c.nombre, descripcion: c.descripcion, requiereValidacionProveedor: c.requiereValidacionProveedor };
    this.showForm = true;
  }

  save() {
    this.error = '';
    const obs = this.editando
      ? this.catSvc.actualizar(this.editando.id, this.form)
      : this.catSvc.crear(this.form);
    obs.subscribe({
      next: () => { this.successMsg = this.editando ? 'Categoría actualizada' : 'Categoría creada'; this.showForm = false; this.load(); },
      error: e => this.error = e.error?.detail || 'Error al guardar'
    });
  }

  eliminar(c: Categoria) {
    if (!confirm(`¿Eliminar la categoría "${c.nombre}"?`)) return;
    this.catSvc.eliminar(c.id).subscribe({
      next: () => { this.successMsg = 'Categoría eliminada'; this.load(); },
      error: () => this.error = 'No se puede eliminar: tiene tickets asociados'
    });
  }
}
