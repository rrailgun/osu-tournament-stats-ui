import { Component, inject, OnInit } from '@angular/core';
import { OsuApiService } from '../../services/osu-api.service';
import { BehaviorSubject } from 'rxjs';
import { Tournament } from '../../models/tournament';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournament-page',
  imports: [],
  templateUrl: './tournament-page.component.html',
  styleUrl: './tournament-page.component.css'
})
export class TournamentPageComponent implements OnInit {

  private readonly osuApi: OsuApiService = inject(OsuApiService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  private tournamentDetails$: BehaviorSubject<Tournament | undefined> = new BehaviorSubject<Tournament | undefined>(undefined);

  ngOnInit(): void {
    this.getDetailsData();
  }

  getDetailsData(): void {
    this.osuApi.getTournamentDetails(this.route.snapshot.paramMap.get('tournamentId') ?? '').subscribe( res => {
      this.tournamentDetails$.next(res);
      
    })
  }

  
}
