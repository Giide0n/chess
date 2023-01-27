import { Color } from './PieceType';
import type { BoardState } from './Boards';
import { STANDARD_BOARD } from './Boards';
import { Board } from './Board';
import type { Coordinates } from './Coordinates';

export class GameState extends Board {
	constructor(boardState: BoardState = STANDARD_BOARD, private currentColor: Color = Color.WHITE) {
		super(boardState);
	}

	getCurrentPlayer(): Color {
		return this.currentColor;
	}

	public getLegalMoves(from: Coordinates): Coordinates[] {
		if (super.pieceAt(from)?.color !== this.currentColor) {
			return [];
		}

		return super.getLegalMoves(from);
	}

	public attemptMove(from: Coordinates, to: Coordinates): boolean {
		if (super.pieceAt(from)?.color !== this.currentColor) {
			return false;
		}

		if (!super.attemptMove(from, to)) {
			return false;
		}

		this.switchColor();
		return true;
	}

	private switchColor(): void {
		this.currentColor = this.currentColor === Color.WHITE ? Color.BLACK : Color.WHITE;
	}
}
