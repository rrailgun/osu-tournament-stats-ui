import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OsuApiService } from '../../services/osu-api.service';
import { BehaviorSubject } from 'rxjs';
import { Score } from '../../models/scores';
import { LoadingIndicatorComponent } from '../../components/common/loading-indicator/loading-indicator.component';
import { AsyncPipe } from '@angular/common';
import { ScoreFilterService } from '../../services/score-filter.service';
import { PlayerScoreTableComponent } from '../../components/tables/player-score-table/player-score-table.component';

@Component({
  selector: 'app-player-page',
  imports: [PlayerScoreTableComponent, LoadingIndicatorComponent, AsyncPipe],
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
