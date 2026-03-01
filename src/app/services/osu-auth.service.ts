import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
}

interface AuthResponse {
  token: TokenResponse;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'access_token';

  private readonly USER_KEY = 'user';
  private userData = new BehaviorSubject<User | null>(this.getUserFromStorage());
  userData$ = this.userData.asObservable();
  private readonly apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  exchangeCodeForToken(code: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl + '/auth', { code }).pipe(
      tap(res => {
        localStorage.setItem(this.TOKEN_KEY, res.token.access_token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));
        this.userData.next(res.user);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.userData.next(null);
  }

  loggedIn(): boolean {
    return localStorage.getItem(this.TOKEN_KEY) !== null;
  }

  private getUserFromStorage(): User | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}
