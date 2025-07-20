
import { CellState } from './CellState';

/**
 * Represents a single turn in Conway's Game of Life.
 * Each turn can have multiple potential future states (children) based on different user modifications,
 * creating a tree structure of possible game states.
 */
export class GameTurn {
  /**
   * The current state of the board.
   * Each cell's state is represented by the CellState enum, which tracks both
   * the life state and any transitions or user modifications that occurred.
   */
  board: CellState[][];

  /**
   * The turn number in the game sequence.
   * The initial board state is turn 0.
   */
  turn_number: number;

  /**
   * Reference to the previous turn that led to this state.
   * null for the initial turn (turn 0).
   */
  parent: GameTurn | null;

  /**
   * Creates a new GameTurn instance.
   * @param board - The state of the board for this turn
   * @param turn_number - The sequential number of this turn
   * @param parent - Reference to the parent turn (optional)
   */
  constructor(
    board: CellState[][],
    turn_number: number,
    parent: GameTurn | null = null
  ) {
    // Create deep copy of the board
    this.board = board.map(row => [...row]);
    this.turn_number = turn_number;
    this.parent = parent;
  }

  /**
   * Creates a deep copy of the current GameTurn instance.
   * @returns A new GameTurn instance with copied data but no parent or children references
   */
  clone(): GameTurn {
    return new GameTurn(
      this.board,
      this.turn_number,
      null
    );
  }

  /**
   * Returns true if the cell at the given position is in any "alive" state
   * @param row - Row index of the cell
   * @param col - Column index of the cell
   * @returns boolean indicating if the cell is alive
   */
  isCellAlive(row: number, col: number): boolean {
    return CellState.isAlive(this.board[row][col]);
  }

  /**
   * Updates the state of a cell with user modification
   * @param row - Row index of the cell
   * @param col - Column index of the cell
   */
  modifyCell(row: number, col: number): void {
    this.board[row][col] = CellState.userToggle(this.board[row][col]);
  }
}
