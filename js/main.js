function init() {
    resetBoard();
    render();
}


function onCellClicked(col) {
    if (isPcPlaying()) return;
    const isVsPC = document.querySelector('#play-with-pc').checked;
    if (isVsPC) {
        setPcPlaying(true);
        cellClicked(col);
        setTimeout(()=>{
            cellClicked(getRandomIntInclusive(0,6));
            setPcPlaying(false);
        }, 500)
    } else cellClicked(col);
}