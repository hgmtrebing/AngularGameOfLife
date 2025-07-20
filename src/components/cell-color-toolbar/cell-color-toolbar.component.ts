
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CellState } from '../../types/CellState';
import { CellColorService } from '../../services/cell-color.service';

@Component({
  selector: 'app-cell-color-toolbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cell-color-toolbar.component.html',
  styleUrls: ['./cell-color-toolbar.component.css']
})
export class CellColorToolbarComponent implements OnInit {
  cellStates = Object.values(CellState).filter(value => typeof value === 'number');

  constructor(private cellColorService: CellColorService) {}

  ngOnInit(): void {}

  getStateName(state: CellState): string {
    return CellState[state].split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  }

  getColor(state: CellState): string {
    return this.cellColorService.getColor(state);
  }

  onColorChange(state: CellState, event: Event): void {
    const color = (event.target as HTMLInputElement).value;
    this.cellColorService.setColor(state, color);
  }
}
