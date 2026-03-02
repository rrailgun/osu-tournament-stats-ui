import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-round-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-round-modal.component.html',
  styleUrls: ['./add-round-modal.component.css']
})
export class AddRoundModalComponent implements OnChanges {
  @Input() visible = false;
  @Input() isLoading = false;

  @Output() add = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  newRoundName = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && !changes['visible'].currentValue) {
      // reset when hidden
      this.newRoundName = '';
    }
  }

  onAdd() {
    const trimmed = this.newRoundName.trim();
    if (!trimmed || this.isLoading) return;
    this.add.emit(trimmed);
  }

  onClose() {
    this.close.emit();
  }
}
