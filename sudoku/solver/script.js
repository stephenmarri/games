window.addEventListener('load', () => {
    //program enters from this door
    initActions()    
})

function newGame(_boardSize, _level) {    
    
    boardSize = _boardSize;
    boxSize = parseInt(Math.sqrt(boardSize))
    level = _level; 


    board = new Board(boardSize);

    //draw grid on DOM
    view = new View()
    view.createBoardHTML(boardSize)
    view.printBoard(board.board)

    initActions()

}

function clearUserInput(){
    board.board = board.createEmptyBoard()
    view.printBoard(board.board)
}