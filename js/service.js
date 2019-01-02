var gState = {
    board: _createBoard(),
    currPlayer: 1,
    isGameOver: false
};

function isGameOver() {
    return gState.isGameOver;
}
function getBoard() {
    return gState.board;
}

function getPlayer() {
    return gState.currPlayer;
}

function resetBoard() {
    gState.isGameOver = false;
    gState.currPlayer = 1;
    gState.board = _createBoard();
}

function nextPlayer() {
    if (gState.currPlayer === 1) gState.currPlayer = 2;
    else gState.currPlayer = 1;
}

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
        if (currCell.player === sequences[0].player) sequences.push(currCell);
        else sequences = [currCell];
        if (sequences.length === 4 && sequences[0].player) return true;
    }
    return false;
}

function _checkCol(col) {
    const { board } = gState;
    var sequences = [{}];
    for (let i = 0; i < board.length; i++) {
        let currCell = board[i][col];
        if (currCell.player === sequences[0].player) sequences.push(currCell);
        else sequences = [currCell];
        if (sequences.length === 4 && sequences[0].player) return true;
    }
    return false;
}

function _checkBackSlash(row, col) {
    const { board } = gState;
    var sequences = [{}];
    for (let i = -3; i <= 3; i++) {
        if (!(board[row + i] && board[row + i][col + i])) continue;
        let currCell = board[row + i][col + i];
        if (currCell.player === sequences[0].player) sequences.push(currCell);
        else sequences = [currCell];
        if (sequences.length === 4 && sequences[0].player) return true;
    }
    return false;
}

function _checkSlash(row, col) {
    const { board } = gState;
    var sequences = [{}];
    for (let i = -3; i <= 3; i++) {
        if (!(board[row + i] && board[row + i][col - i])) continue;
        let currCell = board[row + i][col - i];
        if (currCell.player === sequences[0].player) sequences.push(currCell);
        else sequences = [currCell];
        if (sequences.length === 4 && sequences[0].player) return true;
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
