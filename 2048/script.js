let board = new Board();
board.createNewGame();
let reset = document.querySelector('#reset2')
let score = document.querySelector('#sValue')
let highScore = document.querySelector('#high_sValue')

let banner = document.querySelector('#banner')
let banner_t = document.querySelector('#banner_t')
let banner_t2 = document.querySelector('#banner_t2')
let banner_yesNo = document.querySelector('#yesNo')
let banner_yes = document.querySelector('#yes')
let banner_no = document.querySelector('#no')


//local storage
let hsFromLoc=0;
if(localStorage.getItem('hscore')){
    hsFromLoc = parseInt(localStorage.getItem('hscore'))
    highScore.textContent = hsFromLoc
}else{
    localStorage.setItem('hscore',"0");
}

reset.addEventListener('click', ()=>{
    banner.style.display="inline-flex";
    banner_t.textContent = "Do you want to Restart?"
    banner_t2.textContent=""
    banner_yesNo.style.display = 'flex'
    
})

banner_yes.addEventListener('click',()=>{
    board.createNewGame();
    score.textContent=0;
    banner.style.display="";
    banner_yesNo.style.display = 'none'
})
banner_no.addEventListener('click',()=>{
    banner.style.display="";
    banner_yesNo.style.display = 'none'
})

banner.addEventListener('click',()=>{
    if(banner_t.textContent=='Game Won!'){
        banner.style.display="none";
    }else if(banner_t.textContent=='Game Over!'){
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
  