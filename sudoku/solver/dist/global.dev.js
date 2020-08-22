"use strict";

var setLimits;
var boardSize = 9;
var level = 2; // 0 = Easy, 1 = Hard, 2 = Evil

var board, boxSize, isBoardValidate, solvedBoard, digger, questionBoard;
var view, dotMenuButton, solverMenu, dotMenuDiv;
var solver, solverStartButton, speedRangeButton, solverStopButton, solverWatchButton; //get set limits. for eg. for grid size: 4, set limits are [[0,1],[2,3]]

function getSetLimits(size) {
  setLimits = [];
  var boxSize = parseInt(Math.sqrt(size));
  var arr = [];

  for (var i = 0; i < size; i++) {
    arr.push(i);

    if ((i + 1) % boxSize == 0 && i != 0) {
      setLimits.push(arr);
      arr = [];
    }
  }

  return setLimits;
}

function random(max) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return Math.floor(Math.random() * (max - min + 1) + min);
} // we have row, columns and boxes in a sudoku
//accessing rows is pretty simple. 
//the below function returns a 2D array with
//box values inside a single row


function generateBoxArray(board, boardSize) {
  // generate a table, but each row contains values of a box
  var boxSize = parseInt(Math.sqrt(boardSize));
  var boxes = Array.from(Array(boardSize), function () {
    return new Array();
  });

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      var row = parseInt(i / boxSize);
      var col = parseInt(j / boxSize);
      var box = col + row * boxSize;
      boxes[box].push(board[i][j]);
    }
  }

  return boxes;
}

function getBoxNumber(row, col, boxSize) {
  var x = parseInt(row / boxSize);
  var y = parseInt(col / boxSize);
  return y + x * boxSize;
} //returns the column array of a board


function generateColumnArray(board) {
  var boardSize = board.length;
  var colArray = Array.from(Array(boardSize), function () {
    return new Array();
  });

  for (var col = 0; col < boardSize; col++) {
    for (var row = 0; row < boardSize; row++) {
      colArray[col][row] = board[row][col];
    }
  }

  return colArray;
}

function removeInArrayValue(arr, val) {
  var idx = arr.indexOf(val);

  if (idx >= 0) {
    arr.splice(idx, 1);
    return true;
  } else {
    return false;
  }
} //return the tranposed values of the board, and 'which' has 2 values: position or values


function transposeBoard(board, boardSize, which) {
  var board_inv = Array.from(Array(boardSize), function () {
    return new Array(boardSize).fill(0);
  });

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      if (which == 'values') {
        board_inv[j][i] = board[i][j];
      } else if (which == 'positions') {
        board_inv[j][i] = [i, j];
      }
    }
  }

  return board_inv;
} //return copy of a given board
//?because somehow, iam not able to acheive the same in script.js
//?everytime i try to copy, its making a reference copy and not value copy


function copyBoard(board) {
  var copyOfBoard = Array.from(Array(board.length), function () {
    return new Array(board.length).fill(0);
  });

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      copyOfBoard[i][j] = board[i][j];
    }
  }

  return copyOfBoard;
} //########################## sleep


function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

function demo() {
  var i;
  return regeneratorRuntime.async(function demo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('Taking a break...');
          _context.next = 3;
          return regeneratorRuntime.awrap(sleep(2000));

        case 3:
          console.log('Two seconds later, showing sleep in a loop...'); // Sleep in loop

          i = 0;

        case 5:
          if (!(i < 5)) {
            _context.next = 13;
            break;
          }

          if (!(i === 3)) {
            _context.next = 9;
            break;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(sleep(2000));

        case 9:
          console.log(i);

        case 10:
          i++;
          _context.next = 5;
          break;

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}