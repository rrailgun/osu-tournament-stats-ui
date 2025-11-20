import { Component, Input } from '@angular/core';
import { MultiselectDropdownComponent } from '../common/multiselect-dropdown/multiselect-dropdown.component';
import { ScoreFilterService } from '../../services/score-filter.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-filter',
  templateUrl: './score-filter.component.html',
  styleUrls: ['./score-filter.component.css'],
  imports: [CommonModule, MultiselectDropdownComponent]
})
export class ScoreFilterComponent {
  // Inputs to enable/disable each filter
  @Input() enableTournamentFilter = true;
  @Input() enableRoundFilter = true;
  @Input() enableMatchFilter = true;
  @Input() enablePlayerFilter = true;
  @Input() enableBeatmapFilter = true;
  constructor(public filterService: ScoreFilterService) {}

  // Placeholder values for selects, to be replaced with real data later
  tournamentIdOptions = [ 'Tournament 1', 'Tournament 2' ];
  roundIdOptions = [ 'Round 1', 'Round 2' ];

  matchIdOptions = [ 'Match 1', 'Match 2' ];
  playerIdOptions = [ 'Player 1', 'Player 2' ];
  beatmapIdOptions = [ 'Beatmap 1', 'Beatmap 2' ];

  onTournamentIdChange(value: string | undefined) {
    this.filterService.setTournamentId(value || undefined);
  }
  onRoundIdChange(value: string | undefined) {
    this.filterService.setRoundId(value || undefined);
  }
  // Helper to get selected options as array
  getSelectedOptions(selectElem: HTMLSelectElement): string[] {
    return Array.from(selectElem.selectedOptions).map(option => option.value);
  }

  onMatchSelectionChange(selected: string[]) {
    this.filterService.setMatchId(selected);
  }
  onPlayerSelectionChange(selected: string[]) {
    this.filterService.setPlayerId(selected);
  }
  onBeatmapSelectionChange(selected: string[]) {
    this.filterService.setBeatmapId(selected);
  }
}
