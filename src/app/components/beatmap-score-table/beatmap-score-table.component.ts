import { Component, inject, Input } from '@angular/core';
import { Score } from '../../models/scores';
import { OsuApiService } from '../../services/osu-api.service';
import { DecimalPipe, PercentPipe } from '@angular/common';
import { calcAccuracy } from 'osu-web.js';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-beatmap-score-table',
  imports: [DecimalPipe, PercentPipe, RouterModule],
  standalone: true,
  templateUrl: './beatmap-score-table.component.html',
  styleUrl: './beatmap-score-table.component.css'
})
export class BeatmapScoreTableComponent {

  @Input() scores: Score[] = [];
  private readonly apiService: OsuApiService = inject(OsuApiService);

  calcAcc(c300: number, c100: number, c50: number, misses: number) {
    return calcAccuracy.osu(c300, c100, c50, misses);
  }

}
