import { Color as C, PieceType as T } from './PieceType';
import type { Piece } from './PieceType';

export type BoardState = (Piece | undefined)[][];

const WHITE_PAWN: Piece = { type: T.PAWN, color: C.WHITE };
const WHITE_ROOK: Piece = { type: T.ROOK, color: C.WHITE };
const WHITE_KNIGHT: Piece = { type: T.KNIGHT, color: C.WHITE };
const WHITE_BISHOP: Piece = { type: T.BISHOP, color: C.WHITE };
const WHITE_QUEEN: Piece = { type: T.QUEEN, color: C.WHITE };
const WHITE_KING: Piece = { type: T.KING, color: C.WHITE };
const BLACK_PAWN: Piece = { type: T.PAWN, color: C.BLACK };
const BLACK_ROOK: Piece = { type: T.ROOK, color: C.BLACK };
const BLACK_KNIGHT: Piece = { type: T.KNIGHT, color: C.BLACK };
const BLACK_BISHOP: Piece = { type: T.BISHOP, color: C.BLACK };
const BLACK_QUEEN: Piece = { type: T.QUEEN, color: C.BLACK };
const BLACK_KING: Piece = { type: T.KING, color: C.BLACK };

export const EMPTY_BOARD: BoardState = [
	[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
	[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
	[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
	[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
	[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
	[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
	[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
	[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
];

export const STANDARD_BOARD: BoardState = [
	[
		BLACK_ROOK,
		BLACK_KNIGHT,
		BLACK_BISHOP,
		BLACK_QUEEN,
		BLACK_KING,
		BLACK_BISHOP,
		BLACK_KNIGHT,
		BLACK_ROOK
	],
	[BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN],
	[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
	[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
	[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
	[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
	[WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN],
	[
		WHITE_ROOK,
		WHITE_KNIGHT,
		WHITE_BISHOP,
		WHITE_QUEEN,
		WHITE_KING,
		WHITE_BISHOP,
		WHITE_KNIGHT,
		WHITE_ROOK
	]
];
