use std::string::ToString;
use wasm_bindgen::prelude::*;

use js_sys::Array;

const EMPTY: &str = "";
const WHITE_PAWN: &str = "wp";
const WHITE_KNIGHT: &str = "wn";
const WHITE_BISHOP: &str = "wb";
const WHITE_ROOK: &str = "wr";
const WHITE_QUEEN: &str = "wq";
const WHITE_KING: &str = "wk";
const BLACK_PAWN: &str = "bp";
const BLACK_KNIGHT: &str = "bn";
const BLACK_BISHOP: &str = "bb";
const BLACK_ROOK: &str = "br";
const BLACK_QUEEN: &str = "bq";
const BLACK_KING: &str = "bk";

const NEW_BOARD: [&str; 64] = [
    BLACK_ROOK, BLACK_KNIGHT, BLACK_BISHOP, BLACK_QUEEN, BLACK_KING, BLACK_BISHOP, BLACK_KNIGHT, BLACK_ROOK,
    BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN,
    WHITE_ROOK, WHITE_KNIGHT, WHITE_BISHOP, WHITE_QUEEN, WHITE_KING, WHITE_BISHOP, WHITE_KNIGHT, WHITE_ROOK
];

#[wasm_bindgen]
pub struct Game {
    is_white_to_move: bool,
    board: [&'static str; 64],
}

#[wasm_bindgen]
impl Game {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Game {
        Game{
            is_white_to_move: true,
            board: NEW_BOARD.clone(),
        }
    }

    pub fn get_current_player(&self) -> String {
        match self.is_white_to_move {
            true => "white".to_string(),
            false => "black".to_string()
        }
    }

    pub fn get_board(&self) -> Array {
        self.board.clone().into_iter()
            .map(|x| JsValue::from_str(x))
            .collect::<Array>()
    }

    pub fn attempt_move(&mut self, from: u8, to: u8) -> bool {
        if self.is_move_legal(&from, &to) {
            self.move_piece(&from, &to);
            return true;
        }
        false
    }

    fn is_move_legal(&self, from: &u8, to: &u8) -> bool {
        true
    }

    fn move_piece(&mut self, from: &u8, to: &u8) {
        self.is_white_to_move = !self.is_white_to_move;
    }
}
