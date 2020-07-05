let board = new Board();
board.createNewGame();

document.addEventListener('keyup', moveHandler)

function moveHandler(event){
    let k = event.keyCode;

    if(k==40){
        board.calcDown();        
        board.drawBoard();
        board.genNewTile();
        board.drawBoard();
    }else  if(k==38){
        board.calcUp();        
        board.drawBoard();
        board.genNewTile();
        board.drawBoard();
    }

}