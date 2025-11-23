import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'access_token';
  private readonly apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) {}

  exchangeCodeForToken(code: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.apiUrl+'/auth', { code }).pipe(
      tap(res => {
        localStorage.setItem(this.TOKEN_KEY, res.access_token);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
