import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractScoreTableComponent } from '../abstract-score-table.component';
import { RouterLink } from "@angular/router";
import { ScoreDropdownComponent } from "../../common/score-dropdown/score-dropdown.component";

@Component({
  selector: 'app-player-score-table',
  imports: [CommonModule, RouterLink, ScoreDropdownComponent],
  templateUrl: './player-score-table.component.html',
  styleUrl: './player-score-table.component.css'
})
export class PlayerScoreTableComponent extends AbstractScoreTableComponent {

}
