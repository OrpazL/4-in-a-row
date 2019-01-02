function init() {
    resetBoard();
    render();
}

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
