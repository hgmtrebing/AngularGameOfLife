import { Injectable } from '@angular/core';
import { CellState } from '../types/CellState';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service responsible for managing cell colors in the Game of Life grid.
 * Provides functionality to get and set colors for different cell states,
 * and observe color changes.
 */
@Injectable({
  providedIn: 'root'
})
export class CellColorService {

  /** Map storing the color values for each cell state */
  private colors: Map<CellState, string>;

  /** Subject for broadcasting color changes to subscribers */
  private colorsSubject: BehaviorSubject<Map<CellState, string>>;

  /**
   * Initializes the service with default colors for all cell states.
   */
  constructor() {
    this.colors = new Map([
      [CellState.ALIVE, '#000000'],
      [CellState.DEAD, '#ffffff'],
      [CellState.DIED_THIS_TURN, '#ff0000'],
      [CellState.BORN_THIS_TURN, '#00ff00'],
      [CellState.BORN_THIS_TURN_USER_KILLED, '#ff8800'],
      [CellState.DIED_THIS_TURN_USER_RESURRECTED, '#0088ff'],
      [CellState.ALIVE_USER_KILLED, '#ff00ff'],
      [CellState.DEAD_USER_RESURRECTED, '#00ffff'],
    ]);
    this.colorsSubject = new BehaviorSubject<Map<CellState, string>>(this.colors);
  }

  /**
   * Retrieves the color for a given cell state.
   * @param state - The cell state to get the color for
   * @returns The color in hexadecimal format (e.g., '#000000'). Returns black if state not found
   */
  getColor(state: CellState): string {
    return this.colors.get(state) || '#000000';
  }

  /**
   * Updates the color for a specific cell state and notifies subscribers of the change.
   * @param state - The cell state to update
   * @param color - The new color in hexadecimal format (e.g., '#000000')
   */
  setColor(state: CellState, color: string): void {
    this.colors.set(state, color);
    this.colorsSubject.next(this.colors);
  }

  /**
   * Returns an Observable that emits the current color map whenever colors are updated.
   * @returns An Observable of the color map
   */
  getColorsObservable(): Observable<Map<CellState, string>> {
    return this.colorsSubject.asObservable();
  }
}
