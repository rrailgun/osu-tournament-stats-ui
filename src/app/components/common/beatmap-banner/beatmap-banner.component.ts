import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Beatmap } from '../../../models/beatmap';

@Component({
  selector: 'app-beatmap-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beatmap-banner.component.html',
  styleUrls: ['./beatmap-banner.component.css']
})
export class BeatmapBannerComponent {
  @Input() beatmapInfo!: Beatmap;

  get coverUrl(): string {
    return `https://assets.ppy.sh/beatmaps/${this.beatmapInfo.beatmapset_id}/covers/card@2x.jpg`;
  }

  get starRating(): string {
    return this.beatmapInfo.difficulty_rating.toFixed(2);
  }
}
