import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GameBoardComponent} from '../components/game-board/game-board.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameBoardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-game-of-life');
}
