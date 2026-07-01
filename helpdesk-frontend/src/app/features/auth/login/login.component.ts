import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  error = ''; loading = false;

  form = this.fb.group({
    correo:   ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  get correo()   { return this.form.get('correo')!; }
  get password() { return this.form.get('password')!; }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.error = ''; this.loading = true;
    const { correo, password } = this.form.value;
    this.auth.login({ correo: correo!, password: password! }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => { this.error = 'Credenciales incorrectas'; this.loading = false; }
    });
  }
}
