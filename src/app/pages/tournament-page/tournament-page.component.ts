import { Component, inject, OnInit } from '@angular/core';
import { OsuApiService } from '../../services/osu-api.service';
import { GroupedScoreResultByBeatmapId } from '../../models/scores';
import { BehaviorSubject } from 'rxjs';
import { Tournament } from '../../models/tournament';
import { Round } from '../../models/round';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BeatmapScoreTableComponent } from "../../components/tables/beatmap-score-table/beatmap-score-table.component";
import { ScoreFilterService } from '../../services/score-filter.service';
import { LoadingIndicatorComponent } from "../../components/common/loading-indicator/loading-indicator.component";
import { BeatmapBannerComponent } from '../../components/common/beatmap-banner/beatmap-banner.component';

@Component({
  selector: 'app-tournament-page',
  imports: [CommonModule, LoadingIndicatorComponent, BeatmapScoreTableComponent, BeatmapBannerComponent],
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
  loading: boolean = true;

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
      this.loading = false;
    });
  }

  public selectRound(round: Round): void {
    if (this.selectedRound?.round_id === round.round_id) return;
    this.loading = true;
    this.selectedRound = round;
    this.scoreFilterService.setRoundId(round.round_id);
    this.getGroupedScores();
  }

}
