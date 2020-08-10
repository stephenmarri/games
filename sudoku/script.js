let boardSize = 9;
let boxSize = parseInt(Math.sqrt(boardSize))
let level = 0; // 0 = Easy, 1 = Hard, 2 = Evil


let board = new Board(boardSize);
let isBoardValidate = board.createBoard();
console.log('isBoardValidate', isBoardValidate)

//dig holes
let solvedBoard = copyBoard(board.board)
let digger = new Digger(level, board.board, boardSize)
let questionBoard = copyBoard(board.board)

//draw grid on DOM
let view = new View()
view.createBoardHTML(boardSize)
view.printBoard(questionBoard)