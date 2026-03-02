import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-round-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './round-editor.component.html',
  styleUrls: ['./round-editor.component.css']
})
export class RoundEditorComponent implements OnInit {
  @Input() round: any;

  // State
  beatmaps: { slot: string, beatmap_id: number | null }[] = [];
  mpLinkIds: string = '';
  hasSavedPool: boolean = false;

  ngOnInit(): void {
    // Initial empty row if none
    if (this.beatmaps.length === 0) {
      this.addBeatmapRow();
    }
  }

  addBeatmapRow() {
    this.beatmaps.push({ slot: '', beatmap_id: null });
  }

  removeBeatmapRow(index: number) {
    this.beatmaps.splice(index, 1);
    // Keep at least one row
    if (this.beatmaps.length === 0) {
      this.addBeatmapRow();
    }
  }

  savePool() {
    // Basic validation
    const validBeatmaps = this.beatmaps.filter(b => b.slot.trim() !== '' && b.beatmap_id !== null);
    console.log('Saving pool:', validBeatmaps);
    // TODO: Wire to real service

    // Simulate API success
    this.hasSavedPool = true;
  }

  saveMpLinks() {
    // Parse commas or newlines
    const parsedIds = this.mpLinkIds
      .split(/[\n,]+/)
      .map(id => id.trim())
      .filter(id => id.length > 0)
      .map(id => Number(id))
      .filter(id => !isNaN(id));

    console.log('Saving MP links:', parsedIds);
    // TODO: Wire to real service
  }
}
