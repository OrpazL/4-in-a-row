function render() {
    renderBoard();
    renderWinningMsg(isGameOver());
    renderWhosTurn();
}

function renderBoard() {
    const board = getBoard();
    var strHtmls = '';
    const elBoardContainer = document.querySelector('.board-container');
    board.forEach((row, rowIdx) => {
        var rowHtmls = '<tr>';
        row.forEach((col, colIdx) => {
            rowHtmls += `
            <td class="cell cell-${rowIdx}-${colIdx} ${
                col.player ? 'filled-' + col.player : ''
            }" onclick="cellClicked(${colIdx})">
            
            </td>
            `;
        });
        rowHtmls += '</tr>';
        strHtmls += rowHtmls;
    });
    elBoardContainer.innerHTML = strHtmls;
}

function renderWinningMsg(isGameOver) {
    const winner = getPlayer();
    const elWinning = document.querySelector('.winning');
    if (isGameOver) {
        elWinning.innerHTML = `Player ${winner === 1 ? 2 : 1} won the game!`;
        elWinning.style.color = winner === 1 ? 'red' : 'yellow';
        elWinning.style.backgroundColor = 'royalblue';
    } else {
        elWinning.innerHTML = '';
        elWinning.style.backgroundColor = 'transparent';
    }
}

function renderWhosTurn() {
    const elWhosTurn = document.querySelector('.whos-turn');
    const player = getPlayer();
    elWhosTurn.innerHTML = `Player ${player}, it's your turn.`;
    elWhosTurn.style.color = player === 1 ? 'yellow' : 'red';
}
