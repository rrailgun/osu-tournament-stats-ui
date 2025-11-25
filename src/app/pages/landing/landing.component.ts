import { Component, inject, OnInit } from '@angular/core';
import { OsuApiService } from '../../services/osu-api.service';
import { BehaviorSubject } from 'rxjs';
import { Tournament } from '../../models/tournament';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {

  private readonly osuApi: OsuApiService = inject(OsuApiService);
  private readonly router: Router = inject(Router);
  tournaments$: BehaviorSubject<Tournament[]> = new BehaviorSubject<Tournament[]>([]);


  ngOnInit(): void {
    this.getTournaments();
  }

  getTournaments(): void {
    this.osuApi.getTournaments().subscribe(res=> {
      this.tournaments$.next(res);
    })
  }

  onCardClick(tournamentId: string) {
    this.router.navigate(['/tournament', tournamentId])
  }

}
