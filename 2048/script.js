let board = new Board();
board.createNewGame();
let reset = document.querySelector('#reset')
let score = document.querySelector('#sValue')
let banner = document.querySelector('#banner')
let banner_t = document.querySelector('#banner_t')

reset.addEventListener('click', ()=>{
    board.createNewGame();
    score.textContent=0;
})

banner.addEventListener('click',()=>{
    if(banner_t.textContent=='Game Won!'){
        banner.style.display="none";
    }else{
        banner.style.display="none";
        board.createNewGame();
        score.textContent=0;
    }    
})

document.addEventListener('keyup', moveHandler)

async function moveHandler(event){
    let k = direction != 0 ? direction : event.keyCode
    
    board.removeClass('double')
    moved=false
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
        if(moved){
            board.genNewTile();
            await sleep(300)
            board.drawBoard();
            board.gameOver();
        }
    }
    direction = 0;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  