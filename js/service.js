const WINNING_LENGTH = 4;

var gState = {
    board: [],
    currPlayer: 1,
    isGameOver: false,
    sequences: [],
    pcIsPlaying: false,
};

// CHECKS WHERE TO PAINT IN THE COLUMN
function cellClicked(col) {
    if (isGameOver()) return;
    const board = getBoard();
    for (let row = board.length - 1; row >= 0; row--) {
        if (!board[row][col].player) {
            fillCol(row, col);
            checkVictory(row, col);
            render();
            break;
        } else continue;
    }
    
}

// UPDATING THE MODEL
function fillCol(row, col) {
    const board = getBoard();
    if (board[row][col].player) return;
    board[row][col].player = getPlayer();
    nextPlayer();
}

/* GETTERS */
function isGameOver() {
    return gState.isGameOver;
}

function isPcPlaying() {
    return gState.pcIsPlaying;
}

function getBoard() {
    return gState.board;
}

function getPlayer() {
    return gState.currPlayer;
}

function getSequence() {
    return gState.sequences;
}
/*************/

function setPcPlaying(bool) {
    gState.pcIsPlaying = bool;
}

function resetBoard() {
    gState.isGameOver = false;
    gState.currPlayer = 1;
    gState.board = _createBoard();
    gState.sequences = [];
    
}

function nextPlayer() {
    if (gState.currPlayer === 1) gState.currPlayer = 2;
    else gState.currPlayer = 1;
}

// CHECK ALL POSSIBLE WINNING SEQUENCES
function checkVictory(row, col) {
    if (
        _checkRow(row) ||
        _checkCol(col) ||
        _checkBackSlash(row, col) ||
        _checkSlash(row, col)
    )
        gState.isGameOver = true;
}

function _checkRow(row) {
    const { board } = gState;
    var sequences = [{}];
    for (let i = 0; i < board[row].length; i++) {
        let currCell = board[row][i];
        if (currCell.player === sequences[0].player)
            sequences.push({ ...currCell, row, col: i });
        else sequences = [{ ...currCell, row, col: i }];
        if (sequences.length === WINNING_LENGTH && sequences[0].player) {
            gState.sequences = sequences;
            return true;
        }
    }
    return false;
}

function _checkCol(col) {
    const { board } = gState;
    var sequences = [{}];
    for (let i = 0; i < board.length; i++) {
        let currCell = board[i][col];
        if (currCell.player === sequences[0].player)
            sequences.push({ ...currCell, row: i, col });
        else sequences = [{ ...currCell, row: i, col }];
        if (sequences.length === WINNING_LENGTH && sequences[0].player) {
            gState.sequences = sequences;
            return true;
        }
    }
    return false;
}

function _checkBackSlash(row, col) {
    const { board } = gState;
    var sequences = [{}];
    for (let i = -3; i <= 3; i++) {
        if (!(board[row + i] && board[row + i][col + i])) continue;
        let currCell = board[row + i][col + i];
        if (currCell.player === sequences[0].player)
            sequences.push({ ...currCell, row: row + i, col: col + i });
        else sequences = [{ ...currCell, row: row + i, col: col + i }];
        if (sequences.length === WINNING_LENGTH && sequences[0].player) {
            gState.sequences = sequences;
            return true;
        }
    }
    return false;
}

function _checkSlash(row, col) {
    const { board } = gState;
    var sequences = [{}];
    for (let i = -3; i <= 3; i++) {
        if (!(board[row + i] && board[row + i][col - i])) continue;
        let currCell = board[row + i][col - i];
        if (currCell.player === sequences[0].player)
            sequences.push({ ...currCell, row: row + i, col: col - i });
        else sequences = [{ ...currCell, row: row + i, col: col - i }];
        if (sequences.length === WINNING_LENGTH && sequences[0].player) {
            gState.sequences = sequences;
            return true;
        }
    }
    return false;
}

function _createBoard(col = 7, row = 6) {
    let mat = new Array(row);
    for (let i = 0; i < mat.length; i++) {
        mat[i] = new Array(col);
        for (let j = 0; j < col; j++) {
            mat[i][j] = _createCell();
        }
    }
    return mat;
}

function _createCell() {
    return {
        player: null
    };
}



// UTIL

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}