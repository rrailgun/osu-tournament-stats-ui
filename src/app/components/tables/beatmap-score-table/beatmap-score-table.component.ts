import { Component } from '@angular/core';
import { DecimalPipe, PercentPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AbstractScoreTableComponent } from '../abstract-score-table.component';

@Component({
  selector: 'app-beatmap-score-table',
  imports: [DecimalPipe, PercentPipe, RouterModule],
  standalone: true,
  templateUrl: './beatmap-score-table.component.html',
  styleUrl: './beatmap-score-table.component.css'
})
export class BeatmapScoreTableComponent extends AbstractScoreTableComponent {


}
