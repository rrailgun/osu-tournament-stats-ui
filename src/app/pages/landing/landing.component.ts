import { Component } from '@angular/core';
import { ScoreTableComponent } from '../../components/score-table/score-table.component';

@Component({
  selector: 'app-landing',
  imports: [ScoreTableComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
