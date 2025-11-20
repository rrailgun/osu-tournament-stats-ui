import { Component, inject, OnInit } from '@angular/core';
import { OsuApiService } from '../../services/osu-api.service';
import { GroupedScoresResult } from '../../models/scores';
import { BehaviorSubject } from 'rxjs';
import { Tournament } from '../../models/tournament';
import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ScoreFilterComponent } from "../../components/score-filter/score-filter.component";
import { ScoreTableComponent } from "../../components/score-table/score-table.component";

@Component({
  selector: 'app-tournament-page',
  imports: [CommonModule, ScoreFilterComponent, ScoreTableComponent],
  templateUrl: './tournament-page.component.html',
  styleUrl: './tournament-page.component.css'
})
export class TournamentPageComponent implements OnInit {
  private readonly osuApi: OsuApiService = inject(OsuApiService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  public tournamentDetails$: BehaviorSubject<Tournament | undefined> = new BehaviorSubject<Tournament | undefined>(undefined);
  public groupedScores$: BehaviorSubject<GroupedScoresResult[] | undefined> = new BehaviorSubject<GroupedScoresResult[] | undefined>(undefined);

  public selectedRoundIndex = 0;

  ngOnInit(): void {
    this.getDetailsData();
    this.getGroupedScores();
  }

  getDetailsData(): void {
    this.osuApi.getTournamentDetails(this.route.snapshot.paramMap.get('tournamentId') ?? '').subscribe(res => {
      this.tournamentDetails$.next(res);
      // Reset selected round index if rounds exist
      if (res?.rounds && res.rounds.length > 0) {
        this.selectedRoundIndex = 0;
      }
    });
  }

  getGroupedScores(): void {
    this.osuApi.groupedScoresQuery().subscribe(res => {
      this.groupedScores$.next(res);
    });
  }

  public selectRound(index: number): void {
    this.selectedRoundIndex = index;
    // Optionally, refetch grouped scores if needed per round
    // this.getGroupedScores();
  }
}
