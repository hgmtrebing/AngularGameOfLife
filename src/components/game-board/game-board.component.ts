
import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../../services/game-state-service';
import { CellState } from '../../types/CellState';
import { CommonModule } from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
  imports: [CommonModule]
})
export class GameBoardComponent implements OnInit {

  private subscription: Subscription|undefined;
  boardData: CellState[][]|undefined;

  constructor(private gameStateService: GameStateService) {}

  ngOnInit(): void {
    this.subscription = this.gameStateService.getCurrentTurnObservable()
      .subscribe(turn => {
        if (turn) {
          this.boardData = turn.board;
        }
      });
  }

  ngOnDestroy(): void {
    // Clean up subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get board(): CellState[][] {
    // @ts-ignore
    return this.boardData;
  }

  get turnNumber(): number {
    return this.gameStateService.getTurnNumber();
  }

  toggleCell(row: number, col: number): void {
    this.gameStateService.modifyCell(row, col);
  }

  advanceTurn(): void {
    this.gameStateService.advanceToNextTurn();
  }

  previousTurn(): void {
    this.gameStateService.goToPreviousTurn();
  }

  isCellAlive(row: number, col: number): boolean {
    return this.gameStateService.getCurrentTurn().isCellAlive(row, col);
  }

  getCellClasses(row: number, col: number): { [key: string]: boolean } {
    const state = this.board[row][col];
    var cellState = `cell-state-${CellState[state].toLowerCase()}`;
    return {
      'cell': true,
      [cellState]: true
    };
  }

}
