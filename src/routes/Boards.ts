import {PieceType as F} from "./PieceType";

export const EMPTY_BOARD = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
]

export const STANDARD_BOARD = [
    [F.BLACK_ROOK, F.BLACK_BISHOP, F.BLACK_KNIGHT , F.BLACK_QUEEN, F.BLACK_KING, F.BLACK_KNIGHT, F.BLACK_BISHOP, F.BLACK_ROOK],
    [F.BLACK_PAWN, F.BLACK_PAWN, F.BLACK_PAWN, F.BLACK_PAWN, F.BLACK_PAWN, F.BLACK_PAWN, F.BLACK_PAWN, F.BLACK_PAWN,],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    [F.WHITE_PAWN, F.WHITE_PAWN, F.WHITE_PAWN, F.WHITE_PAWN, F.WHITE_PAWN, F.WHITE_PAWN, F.WHITE_PAWN, F.WHITE_PAWN ],
    [F.WHITE_ROOK, F.WHITE_BISHOP, F.WHITE_KNIGHT, F.WHITE_QUEEN, F.WHITE_KING, F.WHITE_KNIGHT, F.WHITE_BISHOP, F.WHITE_ROOK],
]
