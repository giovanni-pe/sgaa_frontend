import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:7000/api/v1/User/login';
  private jwtHelper = new JwtHelperService();
  private userEmail: string | null = null;
  private userRole: string | null = null;
  private userId: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }

  login(credentials: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.apiUrl, credentials, httpOptions)
      .pipe(
        tap(response => {
          if (response.success && response.data) {
            const token = response.data;
            localStorage.setItem('token', token);
            this.decodeToken(token);
          } else {
            throw new Error('Login failed');
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    this.userEmail = null;
    this.userRole = null;
    this.userId = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  decodeToken(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    this.userEmail = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || null;
    this.userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
    this.userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
    localStorage.setItem('userId', this.userId || '');
    localStorage.setItem('userEmail', this.userEmail || '');
    localStorage.setItem('userRole', this.userRole || '');
  }

  loadUserFromStorage() {
    this.userId = localStorage.getItem('userId');
    this.userEmail = localStorage.getItem('userEmail');
    this.userRole = localStorage.getItem('userRole');
    console.log(localStorage.getItem('userRole'));
  }

  getUserId(): string | null {
    return this.userId;
  }

  getUserEmail(): string | null {
    return this.userEmail;
  }

  getUserRole(): string | null {
    return this.userRole;
  }
}
