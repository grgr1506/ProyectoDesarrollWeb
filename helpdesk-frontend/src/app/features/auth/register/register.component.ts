import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  nombre = ''; correo = ''; password = ''; rol = 'USUARIO_FINAL';
  error = ''; success = ''; loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = ''; this.loading = true;
    this.auth.register({ nombre: this.nombre, correo: this.correo, password: this.password, rol: this.rol }).subscribe({
      next: () => { this.success = 'Cuenta creada. Redirigiendo...'; setTimeout(() => this.router.navigate(['/login']), 1500); },
      error: (e) => { this.error = e.error || 'Error al registrar'; this.loading = false; }
    });
  }
}
