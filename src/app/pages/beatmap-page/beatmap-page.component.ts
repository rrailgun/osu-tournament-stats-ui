import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BeatmapScoreTableComponent } from '../../components/tables/beatmap-score-table/beatmap-score-table.component';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { OsuApiService } from '../../services/osu-api.service';
import { ScoreFilterService } from '../../services/score-filter.service';
import { Score } from '../../models/scores';
import { LoadingIndicatorComponent } from '../../components/common/loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-beatmap-page',
  imports: [CommonModule, BeatmapScoreTableComponent, LoadingIndicatorComponent],
  templateUrl: './beatmap-page.component.html',
  styleUrl: './beatmap-page.component.css'
})
export class BeatmapPageComponent {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly scoreFilterService = inject(ScoreFilterService);
  private readonly osuApiService = inject(OsuApiService);
  private readonly beatmapId: string = this.route.snapshot.paramMap.get('beatmapId') || '';

  scores$: BehaviorSubject<Score[]> = new BehaviorSubject<Score[]>([]);
  loading: boolean = true;

  ngOnInit(): void {
    this.scoreFilterService.setBeatmapId([this.beatmapId]);
    this.getScoreData();
  }

  getScoreData() {
    this.osuApiService.getScores().subscribe(scores => {
      this.scores$.next(scores);
      this.loading = false;
    });
  }
}
