export enum PieceType {
	KING = 'k',
	QUEEN = 'q',
	ROOK = 'r',
	BISHOP = 'b',
	KNIGHT = 'n',
	PAWN = 'p'
}

export enum Color {
	WHITE = 'w',
	BLACK = 'b'
}

export interface Piece {
	type: PieceType;
	color: Color;
}
