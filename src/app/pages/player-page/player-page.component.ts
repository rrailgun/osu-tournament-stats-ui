import { Component, inject } from '@angular/core';
import { BeatmapScoreTableComponent } from "../../components/beatmap-score-table/beatmap-score-table.component";
import { ActivatedRoute } from '@angular/router';
import { OsuApiService } from '../../services/osu-api.service';
import { BehaviorSubject } from 'rxjs';
import { Score } from '../../models/scores';
import { LoadingIndicatorComponent } from '../../components/common/loading-indicator/loading-indicator.component';
import { AsyncPipe } from '@angular/common';
import { ScoreFilterService } from '../../services/score-filter.service';

@Component({
  selector: 'app-player-page',
  imports: [BeatmapScoreTableComponent, LoadingIndicatorComponent, AsyncPipe],
  templateUrl: './player-page.component.html',
  styleUrl: './player-page.component.css'
})
export class PlayerPageComponent {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly scoreFilterService = inject(ScoreFilterService);
  private readonly osuApiService = inject(OsuApiService);
  private readonly playerId: string = this.route.snapshot.paramMap.get('playerId') || '';

  scores$: BehaviorSubject<Score[]> = new BehaviorSubject<Score[]>([]);
  loading: boolean = true;

  ngOnInit(): void {
    this.scoreFilterService.setPlayerId([this.playerId]);
    this.getScoreData();
  }

  getScoreData() {
    this.osuApiService.getScores().subscribe(scores => {
      this.scores$.next(scores);
      this.loading = false;
    });
  }
}
