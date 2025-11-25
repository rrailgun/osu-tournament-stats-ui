import { Component, Input } from '@angular/core';
import { Score } from '../../../models/scores';

@Component({
  selector: 'app-score-dropdown',
  imports: [],
  templateUrl: './score-dropdown.component.html',
  styleUrl: './score-dropdown.component.css'
})
export class ScoreDropdownComponent {
  @Input() score: Score | undefined;
}
