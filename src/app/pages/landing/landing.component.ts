import { Component, inject, OnInit } from '@angular/core';
import { OsuApiService, TournamentCard } from '../../services/osu-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/osu-auth.service';
import { User } from '../../models/user';



@Component({
  selector: 'app-landing',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {

  private readonly osuApi: OsuApiService = inject(OsuApiService);
  private readonly router: Router = inject(Router);
  readonly authService: AuthService = inject(AuthService);
  tournaments$: BehaviorSubject<TournamentCard[]> = new BehaviorSubject<TournamentCard[]>([]);
  user: Observable<User | null> = this.authService.userData$;



  ngOnInit(): void {
    this.getTournaments();
  }

  getTournaments(): void {
    this.osuApi.getTournaments().subscribe(res => {
      this.tournaments$.next(res);
    })
  }

  onCardClick(tournamentId: string) {
    this.router.navigate(['/tournament', tournamentId])
  }

  onEditClick(tournamentId: string) {
    this.router.navigate(['/tournament/edit', tournamentId])
  }

}
