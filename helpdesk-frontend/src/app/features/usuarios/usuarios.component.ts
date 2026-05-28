import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../core/services/usuario.service';
import { Usuario } from '../../core/models/usuario.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  loading = true;
  error = ''; successMsg = '';

  constructor(private usuarioSvc: UsuarioService) {}

  ngOnInit() { this.load(); }

  load() {
    this.usuarioSvc.listarTodos().subscribe({
      next: u => { this.usuarios = u; this.loading = false; },
      error: () => this.loading = false
    });
  }

  eliminar(u: Usuario) {
    if (!confirm(`¿Eliminar al usuario "${u.nombre}"?`)) return;
    this.usuarioSvc.eliminar(u.id).subscribe({
      next: () => { this.successMsg = 'Usuario eliminado'; this.load(); },
      error: () => this.error = 'No se pudo eliminar el usuario'
    });
  }

  rolLabel(rol: string) {
    const map: Record<string,string> = { USUARIO_FINAL: 'Usuario Final', SOPORTE_TI: 'Soporte TI', SUPERVISOR_TI: 'Supervisor TI' };
    return map[rol] ?? rol;
  }

  rolClass(rol: string) {
    const map: Record<string,string> = { USUARIO_FINAL: 'bg-info text-dark', SOPORTE_TI: 'bg-primary', SUPERVISOR_TI: 'bg-dark' };
    return map[rol] ?? 'bg-secondary';
  }
}
