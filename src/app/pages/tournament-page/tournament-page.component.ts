import { Component, inject, OnInit } from '@angular/core';
import { OsuApiService } from '../../services/osu-api.service';
import { GroupedScoreResultByBeatmapId, GroupedScoresResult } from '../../models/scores';
import { BehaviorSubject } from 'rxjs';
import { Tournament } from '../../models/tournament';
import { Round } from '../../models/round';
import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ScoreFilterComponent } from "../../components/score-filter/score-filter.component";
import { ScoreTableComponent } from "../../components/score-table/score-table.component";
import { ScoreFilterService } from '../../services/score-filter.service';

@Component({
  selector: 'app-tournament-page',
  imports: [CommonModule, ScoreFilterComponent, ScoreTableComponent],
  templateUrl: './tournament-page.component.html',
  styleUrl: './tournament-page.component.css'
})
export class TournamentPageComponent implements OnInit {
  private readonly scoreFilterService = inject(ScoreFilterService);
  private readonly osuApi: OsuApiService = inject(OsuApiService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly tournamentId: string = this.route.snapshot.paramMap.get('tournamentId') ?? '';

  public tournamentDetails$: BehaviorSubject<Tournament | undefined> = new BehaviorSubject<Tournament | undefined>(undefined);
  public groupedScores$: BehaviorSubject<GroupedScoreResultByBeatmapId[] | undefined> = new BehaviorSubject<GroupedScoreResultByBeatmapId[] | undefined>(undefined);

  public selectedRound: Round | undefined;

  ngOnInit(): void {
    this.scoreFilterService.setTournamentId(this.tournamentId);
    this.getDetailsData();
  }

  getDetailsData(): void {
    this.osuApi.getTournamentDetails(this.tournamentId).subscribe(res => {
      this.tournamentDetails$.next(res);
      if (res?.rounds && res.rounds.length > 0) {
        this.selectRound(res.rounds[0]);
      }
    });
  }

  getGroupedScores(): void {
    this.osuApi.getScoreGroupedByBeatmapId().subscribe(res => {
      this.groupedScores$.next(res);
    });
  }

  public selectRound(round: Round): void {
    this.selectedRound = round;
    this.scoreFilterService.setRoundId(round.round_id);
    this.getGroupedScores();
  }

}
