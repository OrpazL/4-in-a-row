function init() {
    resetBoard();
    render();
}

function fillCol(row, col) {
    const board = getBoard();
    if (board[row][col].player) return;
    board[row][col].player = getPlayer();
    nextPlayer();
}

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
