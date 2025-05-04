import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private apiUrl = 'http://localhost:5020/auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    const payload = { username, password };
    return this.http.post<any>(this.apiUrl, payload).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token); // Simulated
        this.router.navigate(['/dashboard']);
      })
    );
  }


  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return false;
    return !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const [, payload] = token.split('.');
      const decoded = JSON.parse(atob(payload));
      const expiry = decoded.exp;
      const now = Math.floor(Date.now() / 1000);
      return expiry < now;
    } catch (e) {
      return true; // If anything goes wrong, treat as expired
    }
  }
}