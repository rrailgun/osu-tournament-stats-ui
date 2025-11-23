import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/osu-auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-landing',
  imports: [],
  templateUrl: './auth-landing.component.html',
  styleUrl: './auth-landing.component.css'
})
export class AuthLandingComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);

  ngOnInit(): void {
    let code = this.route.snapshot.queryParamMap.get('code');
    if (!code) {
      this.router.navigate(['/login-failed']);
      return;
    }
    this.authService.exchangeCodeForToken(code).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.router.navigate(['/login-failed']);
      }
    });
  }
}
