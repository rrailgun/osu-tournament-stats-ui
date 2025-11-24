import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractScoreTableComponent } from '../abstract-score-table.component';

@Component({
  selector: 'app-player-score-table',
  imports: [CommonModule],
  templateUrl: './player-score-table.component.html',
  styleUrl: './player-score-table.component.css'
})
export class PlayerScoreTableComponent extends AbstractScoreTableComponent {

}
