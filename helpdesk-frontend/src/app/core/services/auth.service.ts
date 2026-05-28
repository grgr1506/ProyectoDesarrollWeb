import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { JwtResponse, LoginDTO, RegisterDTO } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = '/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(dto: LoginDTO) {
    return this.http.post<JwtResponse>(`${this.api}/login`, dto).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res));
      })
    );
  }

  register(dto: RegisterDTO) {
    return this.http.post(`${this.api}/register`, dto, { responseType: 'text' });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getToken(): string | null { return localStorage.getItem('token'); }

  getUser(): JwtResponse | null {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  }

  getRol(): string { return this.getUser()?.rol ?? ''; }

  isLoggedIn(): boolean { return !!this.getToken(); }

  isSupervisor(): boolean { return this.getRol() === 'SUPERVISOR_TI'; }
  isSoporte(): boolean { return this.getRol() === 'SOPORTE_TI'; }
  isUsuarioFinal(): boolean { return this.getRol() === 'USUARIO_FINAL'; }
  isTecnico(): boolean { return this.isSoporte() || this.isSupervisor(); }
}
