import { Component, Input } from '@angular/core';
import { DecimalPipe, PercentPipe } from '@angular/common';
import { calcAccuracy } from 'osu-web.js';
import { RouterModule } from '@angular/router';
import { Score } from '../../models/scores';

@Component({ template: '' })
export abstract class AbstractScoreTableComponent {

  @Input() scores: Score[] = [];
  
  selectedScore!: Score;
  showScoreModal = false;

  calcAcc(c300: number, c100: number, c50: number, misses: number): number {
    return calcAccuracy.osu(c300, c100, c50, misses);
  }

  formatMods(mods: string[] | undefined): string {
    return mods?.length ? mods.join(', ') : '-';
  }

  openScore(score: Score) {
    this.selectedScore = score;
    this.showScoreModal = true;
  }

}
