import { Injectable } from '@angular/core';
import {CellState} from '../types/CellState';
import {GameTurn} from '../types/GameTurn';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private currentTurn: GameTurn;
  private currentTurnSubject = new BehaviorSubject<GameTurn|null>(null);
  private readonly rows: number = 25;
  private readonly cols: number = 25;

  constructor() {
    // Initialize with an empty board
    const initialBoard = Array(this.rows).fill(null).map(() =>
      Array(this.cols).fill(CellState.DEAD)
    );
    this.currentTurn = new GameTurn(initialBoard, 0);
    this.currentTurnSubject.next(this.currentTurn);
  }

  getCurrentTurn(): GameTurn {
    return this.currentTurn;
  }

  getCurrentTurnObservable(): Observable<GameTurn|null> {
    return this.currentTurnSubject.asObservable();
  }

  getTurnNumber(): number {
    return this.currentTurn.turn_number;
  }

  modifyCell(row: number, col: number): void {
    this.currentTurn.modifyCell(row, col);
    this.currentTurnSubject.next(this.currentTurn);
  }

  advanceToNextTurn(): void {
    const nextBoard: CellState[][] = Array(this.rows).fill(null).map(() =>
      Array(this.cols).fill(CellState.DEAD)
    );

    // Apply Conway's Game of Life rules
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const liveNeighbors = this.countLiveNeighbors(row, col);
        const currentState = this.currentTurn.board[row][col];
        const isCurrentlyAlive = CellState.isAlive(currentState);

        if (isCurrentlyAlive) {
          // Any live cell with 2 or 3 live neighbors survives
          if (liveNeighbors === 2 || liveNeighbors === 3) {
            nextBoard[row][col] = CellState.ALIVE;
          } else {
            // Dies from underpopulation or overpopulation
            nextBoard[row][col] = CellState.DIED_THIS_TURN;
          }
        } else {
          // Any dead cell with exactly 3 live neighbors becomes alive
          if (liveNeighbors === 3) {
            nextBoard[row][col] = CellState.BORN_THIS_TURN;
          }
        }
      }
    }

    // Create new turn
    this.currentTurn = new GameTurn(nextBoard, this.currentTurn.turn_number + 1, this.currentTurn);
    this.currentTurnSubject.next(this.currentTurn);
  }

  goToPreviousTurn(): boolean {
    if (this.currentTurn.parent) {
      this.currentTurn = this.currentTurn.parent;
      this.currentTurnSubject.next(this.currentTurn);
      return true;
    }
    return false;
  }

  private countLiveNeighbors(row: number, col: number): number {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;

        const newRow = row + i;
        const newCol = col + j;

        if (newRow >= 0 && newRow < this.rows &&
          newCol >= 0 && newCol < this.cols &&
          this.currentTurn.isCellAlive(newRow, newCol)) {
          count++;
        }
      }
    }
    return count;
  }

}
