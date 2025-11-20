import { Component, inject, Input } from '@angular/core';
import { Scores } from '../../models/scores';
import { OsuApiService } from '../../services/osu-api.service';
import { DecimalPipe, PercentPipe } from '@angular/common';
import { calcAccuracy } from 'osu-web.js';

@Component({
  selector: 'app-score-table',
  imports: [DecimalPipe, PercentPipe],
  templateUrl: './score-table.component.html',
  styleUrl: './score-table.component.css'
})
export class ScoreTableComponent {

  @Input() scores: Scores[] = [];
  private readonly apiService: OsuApiService = inject(OsuApiService);

  calcAcc(c300: number, c100: number, c50: number, misses: number) {
    return calcAccuracy.osu(c300, c100, c50, misses);
  }

}
