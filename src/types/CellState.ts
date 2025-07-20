
export enum CellState {
  ALIVE,
  DEAD,
  DIED_THIS_TURN,
  BORN_THIS_TURN,
  BORN_THIS_TURN_USER_KILLED,
  DIED_THIS_TURN_USER_RESURRECTED,
  ALIVE_USER_KILLED,
  DEAD_USER_RESURRECTED,
}

export namespace CellState {

  export function isAlive(state: CellState): boolean {
    return state === CellState.ALIVE
      ||state === CellState.BORN_THIS_TURN
      || state === CellState.DIED_THIS_TURN_USER_RESURRECTED
      || state === CellState.DEAD_USER_RESURRECTED;
  }

  export function userToggle(state: CellState): CellState {
    switch (state) {

      case CellState.ALIVE:
        return CellState.ALIVE_USER_KILLED;

      case CellState.DEAD:
        return CellState.DEAD_USER_RESURRECTED;

      case CellState.DIED_THIS_TURN:
        return CellState.DIED_THIS_TURN_USER_RESURRECTED;

      case CellState.BORN_THIS_TURN:
        return CellState.BORN_THIS_TURN_USER_KILLED;

      case CellState.BORN_THIS_TURN_USER_KILLED:
        return CellState.BORN_THIS_TURN;

      case CellState.DIED_THIS_TURN_USER_RESURRECTED:
          return CellState.DIED_THIS_TURN;

      case CellState.DEAD_USER_RESURRECTED:
          return CellState.DEAD;

      case CellState.ALIVE_USER_KILLED:
          return CellState.ALIVE;

    }
  }

  export function advanceToNextState(state: CellState): CellState {
    switch (state) {
      case CellState.ALIVE:
      case CellState.BORN_THIS_TURN:
      case CellState.DEAD_USER_RESURRECTED:
      case CellState.DIED_THIS_TURN_USER_RESURRECTED:
        return CellState.ALIVE;

      case CellState.DEAD:
      case CellState.DIED_THIS_TURN:
      case CellState.BORN_THIS_TURN_USER_KILLED:
      case CellState.ALIVE_USER_KILLED:
        return CellState.DEAD;
    }
  }

  /**
   * This function determines the simple, "binary" (Alive/Dead) state that the cell was in, prior to the start of this
   * turn. This function is used to compare
   * @param state
   */
  export function backoutToPreviousState(state: CellState): CellState {
    switch (state) {
      case CellState.ALIVE:
      case CellState.DIED_THIS_TURN:
      case CellState.ALIVE_USER_KILLED:
      case CellState.DIED_THIS_TURN_USER_RESURRECTED:
        return CellState.ALIVE;

      case CellState.DEAD:
      case CellState.BORN_THIS_TURN:
      case CellState.BORN_THIS_TURN_USER_KILLED:
      case CellState.DEAD_USER_RESURRECTED:
        return CellState.DEAD;
    }
  }
}
