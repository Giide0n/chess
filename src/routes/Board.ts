import { STANDARD_BOARD } from './Boards';
import type { BoardState } from './Boards';
import type { Coordinates } from './Coordinates';
import { PieceType } from './PieceType';

export class Board {
	public readonly boardState: BoardState;

	constructor() {
		this.boardState = STANDARD_BOARD;
	}

	getBoardState(): BoardState {
		return this.boardState;
	}

	public attemptMove(from: Coordinates, to: Coordinates): BoardState {
		if (this.isMoveValid(from, to)) {
			return this.movePiece(from, to);
		}
		return this.boardState;
	}

	private isMoveValid(from: Coordinates, to: Coordinates): boolean {
		const piece = this.boardState[from.row][from.column];
		switch (piece?.type) {
			case PieceType.PAWN:
				return this.isPawnMoveValid(from, to);
			case PieceType.ROOK:
				return this.isRookMoveValid(from, to);
			case PieceType.KNIGHT:
				return this.isKnightMoveValid(from, to);
			case PieceType.BISHOP:
				return this.isBishopMoveValid(from, to);
			case PieceType.QUEEN:
				return this.isQueenMoveValid(from, to);
			case PieceType.KING:
				return this.isKingMoveValid(from, to);
			default:
				return false;
		}
	}

	private isPawnMoveValid(from: Coordinates, to: Coordinates) {
		return true;
	}

	private isRookMoveValid(from: Coordinates, to: Coordinates) {
		return true;
	}

	private isKnightMoveValid(from: Coordinates, to: Coordinates) {
		return true;
	}

	private isBishopMoveValid(from: Coordinates, to: Coordinates) {
		return true;
	}

	private isQueenMoveValid(from: Coordinates, to: Coordinates) {
		return true;
	}

	private isKingMoveValid(from: Coordinates, to: Coordinates) {
		return true;
	}

	private movePiece(from: Coordinates, to: Coordinates): BoardState {
		const piece = this.boardState[from.row][from.column];
		this.boardState[from.row][from.column] = undefined;
		this.boardState[to.row][to.column] = piece;

		return this.boardState;
	}
}
