import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Scores } from '../../models/scores';
import { OsuApiService } from '../../services/osu-api.service';
import { AsyncPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { TooltipComponent } from '../common/tooltip/tooltip.component';
import { calcAccuracy } from 'osu-web.js';

@Component({
  selector: 'app-score-table',
  imports: [AsyncPipe, DecimalPipe, TooltipComponent, PercentPipe],
  templateUrl: './score-table.component.html',
  styleUrl: './score-table.component.css'
})
export class ScoreTableComponent implements OnInit {

  scores$: BehaviorSubject<Scores[]> = new BehaviorSubject<Scores[]>([]);
  private readonly apiService: OsuApiService = inject(OsuApiService);

  ngOnInit(): void {
    this.getScores();
  }


  getScores(): void {
    this.apiService.getScores().subscribe( res => {
      this.scores$.next(res);
    })
  }

  calcAcc(c300: number, c100: number, c50: number, misses: number) {
    return calcAccuracy.osu(c300, c100, c50, misses);
  }

}
