import { isEqual } from 'lodash-es';
import type { BoardState } from './Boards';
import { STANDARD_BOARD } from './Boards';
import type { Coordinates } from './Coordinates';
import type { Piece } from './PieceType';
import { Color, PieceType } from './PieceType';

export class Board {
	constructor(private readonly boardState: BoardState = STANDARD_BOARD) {}

	getBoardState(): BoardState {
		return this.boardState;
	}

	public getLegalMoves(from: Coordinates): Coordinates[] {
		if (!this.pieceAt(from)) {
			return [];
		}

		const legalMoves: Coordinates[] = [];

		this.boardState.forEach((row, rowIndex) => {
			row.forEach((piece, columnIndex) => {
				if (this.isMoveValid(from, { row: rowIndex, column: columnIndex })) {
					legalMoves.push({ row: rowIndex, column: columnIndex });
				}
			});
		});

		return legalMoves;
	}

	public attemptMove(from: Coordinates, to: Coordinates): boolean {
		if (!this.isMoveValid(from, to)) {
			return false;
		}
		this.movePiece(from, to);
		return true;
	}

	public pieceAt(coordinates: Coordinates): Piece | undefined {
		return this.boardState[coordinates.row][coordinates.column];
	}

	private isMoveValid(from: Coordinates, to: Coordinates): boolean {
		if (isEqual(from, to)) {
			return false;
		}

		switch (this.pieceAt(from)?.type) {
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

	private isPawnMoveValid(from: Coordinates, to: Coordinates): boolean {
		const direction = this.pieceAt(from)?.color === Color.WHITE ? -1 : 1;

		if (from.row + direction === to.row && from.column === to.column) {
			return this.pieceAt(to) === undefined;
		}

		if (from.row + direction * 2 === to.row && from.column === to.column) {
			if (
				(this.pieceAt(from)?.color === Color.WHITE && from.row === 6) ||
				(this.pieceAt(from)?.color === Color.BLACK && from.row === 1)
			) {
				return (
					this.pieceAt(to) === undefined &&
					this.pieceAt({ row: from.row + direction, column: from.column }) === undefined
				);
			}
		}

		if (from.row + direction === to.row && Math.abs(from.column - to.column) === 1) {
			return this.pieceAt(to) !== undefined && this.checkForCapture(from, to);
		}

		return false;
	}

	private isRookMoveValid(from: Coordinates, to: Coordinates): boolean {
		if (from.row !== to.row && from.column !== to.column) {
			return false;
		}

		if (this.pieceBetween(from, to)) {
			return false;
		}

		return this.checkForCapture(from, to);
	}

	private isKnightMoveValid(from: Coordinates, to: Coordinates): boolean {
		const rowDifference = Math.abs(from.row - to.row);
		const columnDifference = Math.abs(from.column - to.column);

		if (
			!(
				(rowDifference === 2 && columnDifference === 1) ||
				(rowDifference === 1 && columnDifference === 2)
			)
		) {
			return false;
		}

		return this.checkForCapture(from, to);
	}

	private isBishopMoveValid(from: Coordinates, to: Coordinates): boolean {
		const rowDifference = Math.abs(from.row - to.row);
		const columnDifference = Math.abs(from.column - to.column);
		if (rowDifference !== columnDifference) {
			return false;
		}

		if (this.pieceBetween(from, to)) {
			return false;
		}

		return this.checkForCapture(from, to);
	}

	private isQueenMoveValid(from: Coordinates, to: Coordinates): boolean {
		const rowDifference = Math.abs(from.row - to.row);
		const columnDifference = Math.abs(from.column - to.column);

		if (!(rowDifference === 0 || columnDifference === 0 || rowDifference === columnDifference)) {
			return false;
		}

		if (this.pieceBetween(from, to)) {
			return false;
		}

		return this.checkForCapture(from, to);
	}

	private isKingMoveValid(from: Coordinates, to: Coordinates): boolean {
		const rowDifference = Math.abs(from.row - to.row);
		const columnDifference = Math.abs(from.column - to.column);

		if (!(rowDifference <= 1 && columnDifference <= 1)) {
			return false;
		}

		return this.checkForCapture(from, to);
	}

	private pieceBetween(from: Coordinates, to: Coordinates): boolean {
		const rowDifference = from.row - to.row;
		const rowDirection = rowDifference < 0 ? -1 : rowDifference > 0 ? 1 : 0;

		const columnDifference = from.column - to.column;
		const columnDirection = columnDifference < 0 ? -1 : columnDifference > 0 ? 1 : 0;
		const tileBetween = { row: to.row + rowDirection, column: to.column + columnDirection };

		if (isEqual(from, tileBetween)) {
			return false;
		}

		if (this.pieceAt(tileBetween) !== undefined) {
			return true;
		}

		return this.pieceBetween(from, tileBetween);
	}

	private checkForCapture(from: Coordinates, to: Coordinates): boolean {
		if (this.pieceAt(to) !== undefined) {
			return this.pieceAt(from)?.color !== this.pieceAt(to)?.color;
		}
		return true;
	}

	private movePiece(from: Coordinates, to: Coordinates): void {
		const piece = this.boardState[from.row][from.column];
		this.boardState[from.row][from.column] = undefined;
		this.boardState[to.row][to.column] = piece;
	}
}
