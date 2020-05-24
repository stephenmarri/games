let canvas = document.getElementById('myCanvas');
  /** @type {CanvasRenderingContext2D}  */
let ctx = canvas.getContext("2d");
let result_container = document.getElementsByClassName('result-container');

//################################################################################# Globals

var keys = [];
var animationId;
var playButton = document.querySelector('#controls__play');
var score = document.querySelector('#score__text')
var levelElement = document.querySelector('#level__text')
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

}



//################################################################################# main
let board;
function playButtonHandler(){
    if(playButton.textContent=='Play'){
        resetGame();
        playButton.textContent='Stop'
        board= new Board(ctx);
        well = board.getEmptyBoard();
        animate()
        document.addEventListener('keydown',   VarkeyDownHandler);
    }else
    if(playButton.textContent=='Stop'){
        isGameOver=true;
        gameOver("Game Over");
        playButton.textContent='Play';
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
}

playButton.addEventListener('click',playButtonHandler)





