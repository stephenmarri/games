let board = new Board();
board.createNewGame();

document.addEventListener('keyup', moveHandler)

async function moveHandler(event){
    let k = event.keyCode;

    if(k==40){
        board.cDown();        
    }else  if(k==38){
        board.cUp();        
    }else  if(k==37){
        board.cLeft();        
    }else  if(k==39){
        board.cRight();        
    }

    if(k >= 37 && k<=40){
        board.drawBoard();
        await sleep(500)
        board.genNewTile();
        board.drawBoard();
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  