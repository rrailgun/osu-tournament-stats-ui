import { Component } from '@angular/core';
import { ScoreTableComponent } from "../../components/score-table/score-table.component";

@Component({
  selector: 'app-player-page',
  imports: [ScoreTableComponent],
  templateUrl: './player-page.component.html',
  styleUrl: './player-page.component.css'
})
export class PlayerPageComponent {

}
