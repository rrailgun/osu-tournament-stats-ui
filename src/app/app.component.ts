import { Component, inject, HostListener } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { buildUrl } from 'osu-web.js';
import { User } from './models/user';
import { CommonModule } from '@angular/common';
import { OsuApiService } from './services/osu-api.service';
import { AuthService } from './services/osu-auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  isDropdownOpen: boolean = false;


  osuApi: OsuApiService = inject(OsuApiService);
  authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  userInfo: Observable<User | null> = this.authService.userData$;



  login() {
    window.location.href = buildUrl.authRequest(44993, 'http://localhost:4200/auth', ['identify']);
  }

  logout() {
    this.authService.clearToken();
    this.isDropdownOpen = false;
    this.router.navigate(['/']);
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }


}
