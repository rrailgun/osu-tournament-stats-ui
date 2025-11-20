import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-multiselect-dropdown',
  templateUrl: './multiselect-dropdown.component.html',
  styleUrls: ['./multiselect-dropdown.component.css'],
  imports: [CommonModule, NgbDropdownModule]
})
export class MultiselectDropdownComponent {
  @Input() options: string[] = [];
  @Input() selected: string[] = [];
  @Output() selectionChange = new EventEmitter<string[]>();

  dropdownOpen = false;
  private tempSelected: string[] = [];

  ngOnInit() {
    this.tempSelected = [...this.selected];
  }

  openDropdown() {
    this.tempSelected = [...this.selected];
    this.dropdownOpen = true;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  onCheckboxChange(option: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.tempSelected = [...this.tempSelected, option];
    } else {
      this.tempSelected = this.tempSelected.filter(o => o !== option);
    }
  }

  applySelection() {
    this.selectionChange.emit([...this.tempSelected]);
    this.selected = [...this.tempSelected];
    this.closeDropdown();
  }

  clearSelection() {
    this.tempSelected = [];
    this.selectionChange.emit([]);
    this.selected = [];
    this.closeDropdown();
  }

  isChecked(option: string): boolean {
    return this.tempSelected.includes(option);
  }
}
