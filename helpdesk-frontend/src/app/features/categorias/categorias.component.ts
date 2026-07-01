import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../core/services/categoria.service';
import { Categoria } from '../../core/models/categoria.model';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent implements OnInit {
  private catSvc = inject(CategoriaService);
  private fb = inject(FormBuilder);

  categorias: Categoria[] = [];
  loading = true;
  error = ''; successMsg = '';
  editando: Categoria | null = null;
  showForm = false;

  form = this.fb.group({
    nombre:                     ['', [Validators.required, Validators.minLength(3)]],
    descripcion:                [''],
    requiereValidacionProveedor: [false]
  });

  ngOnInit() { this.load(); }

  get nombre()      { return this.form.get('nombre')!; }
  get descripcion() { return this.form.get('descripcion')!; }

  load() {
    this.loading = true;
    this.catSvc.listarTodas().subscribe({
      next: c => { this.categorias = c; this.loading = false; },
      error: () => this.loading = false
    });
  }

  openNew() {
    this.editando = null;
    this.form.reset({ nombre: '', descripcion: '', requiereValidacionProveedor: false });
    this.showForm = true;
  }

  openEdit(c: Categoria) {
    this.editando = c;
    this.form.patchValue({ nombre: c.nombre, descripcion: c.descripcion, requiereValidacionProveedor: c.requiereValidacionProveedor });
    this.showForm = true;
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.error = '';
    const obs = this.editando
      ? this.catSvc.actualizar(this.editando.id, this.form.value as any)
      : this.catSvc.crear(this.form.value as any);
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
