import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  error = ''; success = ''; loading = false;

  form = this.fb.group({
    nombre:   ['', [Validators.required, Validators.minLength(3)]],
    correo:   ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rol:      ['USUARIO_FINAL', Validators.required]
  });

  get nombre()   { return this.form.get('nombre')!; }
  get correo()   { return this.form.get('correo')!; }
  get password() { return this.form.get('password')!; }
  get rol()      { return this.form.get('rol')!; }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.error = ''; this.loading = true;
    this.auth.register(this.form.value as any).subscribe({
      next: () => { this.success = 'Cuenta creada. Redirigiendo...'; setTimeout(() => this.router.navigate(['/login']), 1500); },
      error: (e) => { this.error = e.error || 'Error al registrar'; this.loading = false; }
    });
  }
}
