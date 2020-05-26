let canvas = document.getElementById('myCanvas');
  /** @type {CanvasRenderingContext2D}  */
let ctx = canvas.getContext("2d");
let nextCanvas = document.getElementById('nextCanvas'); 
/** @type {CanvasRenderingContext2D}  */ 
let nextCtx = nextCanvas.getContext("2d");
let result_container = document.getElementsByClassName('result-container');

//################################################################################# Globals

var keys = [];
var animationId;
var playButton = document.querySelector('#controls__play');
var score = document.querySelector('#score__text')
var levelElement = document.querySelector('#level__text')
var mobile__contorls_element = document.querySelector('#mobile__contorls')
var next__block_element = document.querySelector('#next-block')
//################################################################################# Globals


ctx.canvas.width = singleBlockSize * wellColumns;
ctx.canvas.height = singleBlockSize * wellRows;


result_container[0].style.width =  '150px';
result_container[0].style.height = singleBlockSize * wellRows +'px';






//################################################################################# main
moves = {
    down: bp => ({...bp, y: bp.y + 1}),
    left: bp => ({...bp, x: bp.x - 1}),
    right: bp => ({...bp, x: bp.x + 1}),
    up: bp => board.rotate(bp)
}


function moveDown(){
    if(frameCount- downFC>gameSpeed && !isGameOver && !isGameWon){
        downFC=frameCount;
        bp = board.piece;    
        p = moves.down(bp)                        
        if(board.piece.reachedBottom(p)){
            board.piece.freeze(p);
            board.getNewPiece();            
            
        }else {
            board.piece.move(p)        
        }
        board.draw();
    }
    
}


var VarkeyDownHandler = function keyDownHandler(event){  
      
    bp = board.piece;    
    if(event.key == 'ArrowDown'){
        p = moves.down(bp)        
                
        if(board.piece.reachedBottom(p)){
            board.piece.freeze(p);
            board.getNewPiece();            
            
        }else {
            board.piece.move(p)        
        }
        board.draw();
        
    }else if(event.key == 'ArrowLeft'){
        p = moves.left(bp)
        if(board.piece.move(p)){
            if(board.piece.reachedBottom(p) ){
                board.piece.freeze(p);
                board.getNewPiece();
                
            }
        }
        board.draw();
    }else if(event.key == 'ArrowRight'){
        p = moves.right(bp)
        if(board.piece.move(p)){
            if(board.piece.reachedBottom(p) ){
                board.piece.freeze(p);
                board.getNewPiece();
                
            }
        }
        board.draw();
    }else if(event.key == 'ArrowUp'){
        
        bp = moves.up(bp)
        if(board.piece.reachedBottom(bp) == 0){
            board.piece.move(bp)      
            board.draw();
        }        
    }
    

    
}


function gameOver(text){
    cancelAnimationFrame(animationId);
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0, 0.5)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.restore();
    ctx.font = "30px Chelsea Market";    
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width/2,canvas.height/2);   
    playButton.textContent='Play' ;
    document.removeEventListener('keydown',  VarkeyDownHandler);
    mobile__contorls.removeEventListener('click',mediaEventHandler);

}



//################################################################################# main
let board;
function playButtonHandler(){
    if(playButton.textContent=='Play'){
        resetGame();
        playButton.textContent='Pause'
        board= new Board(ctx);
        well = board.getEmptyBoard();
        animate()
        document.addEventListener('keydown',   VarkeyDownHandler);
        mobile__contorls.addEventListener('click',mediaEventHandler);
    }else
    if(playButton.textContent=='Pause'){                
        playButton.textContent='Resume';
        cancelAnimationFrame(animationId);
        document.removeEventListener('keydown',  VarkeyDownHandler);
        mobile__contorls.removeEventListener('click',mediaEventHandler);
        ctx.save();
        ctx.fillStyle = "rgba(0,0,0, 0.5)";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.restore();
        ctx.font = "30px Chelsea Market";    
        ctx.textAlign = "center";
        ctx.fillText("Paused", canvas.width/2,canvas.height/2);  
    }else
    if(playButton.textContent=='Resume'){
        playButton.textContent='Pause';
        animate();
        document.addEventListener('keydown',   VarkeyDownHandler);
        mobile__contorls.addEventListener('click',mediaEventHandler);
    }
}

function animate(){    
    frameCount++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    moveDown();
    board.draw();       
    if(isGameOver ){
    gameOver("Game Over");
    }
    if(isGameWon ){
    gameOver("You Won");
    }    
    animationId = requestAnimationFrame(animate);            
}

function resetGame(){
    frameCount=0;
    isGameWon=false;
    downFC=0;
    frameCount=0;
    isGameOver=false;
    score.textContent=0;
    levelElement.textContent=1;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    well=null;
    board=null;    
    totalLinesCleared=0;
    gameSpeed=intialSpeed;
    currentPiece = null;
    nextPiece = null;
    cancelAnimationFrame(animationId);
    tetrisCount = 0;
    currentLevel=1
}

playButton.addEventListener('click',playButtonHandler)


//########################################################################### media queries
function mediaFunction(media) {
    if (media.matches) { // If media query matches
        mobile__contorls_element.style.display = 'Flex';
        //next__block_element.style.display='none';
        next__block_element.style.height="25%"
        var mobile__contorls = document.querySelector('#mobile__contorls')
    } 
  }

  function mediaEventHandler(){
      event.preventDefault();
      let tId = event.target.parentElement.id;
      let Id = event.target.id;
      bp = board.piece;    

      if(tId=='rotate' || Id=='rotate'){
            bp = moves.up(bp)
            if(board.piece.reachedBottom(bp) == 0){
                board.piece.move(bp)      
                board.draw();
            }   
      }
      if(tId=='left__div' || Id=='left__div'){
        p = moves.left(bp)
        if(board.piece.move(p)){
            if(board.piece.reachedBottom(p) ){
                board.piece.freeze(p);
                board.getNewPiece();
                
            }
        }
        board.draw();
      }
      if(tId=='right__div' || Id=='right__div'){
            p = moves.right(bp)
            if(board.piece.move(p)){
                if(board.piece.reachedBottom(p) ){
                    board.piece.freeze(p);
                    board.getNewPiece();
                    
                }
            }
            board.draw();
      }
      if(tId=='down' || Id =='down'){
        p = moves.down(bp)        
                
        if(board.piece.reachedBottom(p)){
            board.piece.freeze(p);
            board.getNewPiece();            
            
        }else {
            board.piece.move(p)        
        }
        board.draw();
      }
  }
  
  var media = window.matchMedia("(max-width: 600px)")
  mediaFunction(media) // Call listener function at run time
  media.addListener(mediaFunction)




//########################################################## next canvas
nextCtx.canvas.height=singleBlockSize*4;
nextCtx.canvas.width='150';



function drawRules(){        
    ctx.fillStyle="white";
    ctx.textAlign = "center";
    ctx.font = "30px Chelsea Market";    
    ctx.fillText("Rules", canvas.width/2,40);      
    ctx.font = "20px Caveat";    
    ctx.fillText("--------------", canvas.width/2,60);      
    ctx.fillText("Score:", canvas.width/4,90);  
    ctx.font = "13px Raleway";    
    ctx.textAlign = "left";
    ctx.fillText("1 line  cleared:   40 points", 30,110);      
    ctx.fillText("2 lines cleared:   100 points", 30,126);      
    ctx.fillText("3 lines cleared:   400 points", 30,141);      
    ctx.fillText("4 lines cleared:   1200 points", 30,156); 
    ctx.font = "15px Chelsea Market";    
    ctx.fillText("Tetris:  4 lines", 30,175); 
    ctx.font = "20px Caveat";           
    ctx.fillText("Levels:", 30,230); 
    ctx.font = "13px Raleway";          
    ctx.fillText("L1: 1 Tetris OR 1200 points", 30, 256);      
    ctx.fillText("L2: 2 Tetris OR 3600 points", 30,271);      
    ctx.fillText("L3: 3 Tetris OR 7200 points", 30,286);      
    ctx.fillText("L4: 4 Tetris OR 12000 points", 30,301); 
    ctx.font = "20px Caveat";           
    ctx.fillText("How to win?:", 30,350); 
    ctx.font = "13px Raleway";          
    ctx.fillText("Clear L4: Total 10 Tetris or", 30, 376);      
    ctx.fillText("Score 12000 pts", 88, 396);      

}

window.addEventListener('load',drawRules);