function render() {
    renderBoard();
    renderWinningMsg(isGameOver());
    renderWhosTurn();
}

// RENDERS THE BOARD
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
            }" onclick="onCellClicked(${colIdx})">
            
            </td>
            `;
        });
        rowHtmls += '</tr>';
        strHtmls += rowHtmls;
    });
    elBoardContainer.innerHTML = strHtmls;
}

// RENDERS WINNING MODAL
function renderWinningMsg(isGameOver) {
    const loser = getPlayer();
    const elWinning = document.querySelector('.winning');
    const isVsPC = document.querySelector('#play-with-pc').checked;
    if (isGameOver) {
        if (isVsPC && loser === 1) elWinning.innerHTML = `PC won the game!`;
        else elWinning.innerHTML = `Player ${loser === 1 ? 2 : 1} won the game!`;
        elWinning.style.color = loser === 1 ? 'red' : 'yellow';
        elWinning.style.backgroundColor = 'royalblue';
    } else {
        elWinning.innerHTML = '';
        elWinning.style.backgroundColor = 'transparent';
    }
    _showSequence(isGameOver);
}

// RENDERS TURNS GUIDE LINE
function renderWhosTurn() {
    const elWhosTurn = document.querySelector('.whos-turn');
    const player = getPlayer();
    if (isPcPlaying() && player === 2) elWhosTurn.innerHTML = 'PC is playing...';
    else {
        elWhosTurn.innerHTML = `Player ${player}, it's your turn.`;
    }
    elWhosTurn.style.color = player === 1 ? 'yellow' : 'red';
}

// RENDERS ANIMATION ON THE WINNING SEQUENCE
function _showSequence(isGameOver) {
    const sequence = getSequence();
    var elSequence = [];
    sequence.forEach(cell => {
        let elCell = document.querySelector(`.cell-${cell.row}-${cell.col}`);
        elSequence.push(elCell);
    });
    elSequence.forEach(el => {
        if (isGameOver) el.classList.add('cell-sequence');
        else if (el.classList.contains('cell-sequence'))
            el.classList.remove('cell-sequence');
    });
}
