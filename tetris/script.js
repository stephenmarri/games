let canvas = document.getElementById('myCanvas');
  /** @type {CanvasRenderingContext2D}  */
let ctx = canvas.getContext("2d");
let result_container = document.getElementsByClassName('result-container');

//################################################################################# Globals

var keys = [];
var animationId;
//################################################################################# Globals


ctx.canvas.width = singleBlockSize * wellColumns;
ctx.canvas.height = singleBlockSize * wellRows;

result_container[0].style.width =  '150px';
result_container[0].style.height = singleBlockSize * wellRows +'px';



//################################################################################# main

let board = new Board(ctx);
well = board.getEmptyBoard();

animate()

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    board.draw();

    animationId = requestAnimationFrame(animate);
}


//################################################################################# main
moves = {
    down: bp => ({...bp, y: bp.y + 1}),
    left: bp => ({...bp, x: bp.x - 1}),
    right: bp => ({...bp, x: bp.x + 1}),
    up: bp => board.rotate(bp)
}

document.addEventListener('keydown',  ()=> keyDownHandler(event));

function keyDownHandler(){
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
        if(board.piece.reachedBottom(p)){
            board.piece.freeze(p);
            board.getNewPiece();
            
        }else {
            board.piece.move(p)        
        }
        board.draw();
    }else if(event.key == 'ArrowRight'){
        p = moves.right(bp)
        if(board.piece.reachedBottom(p)){
            board.piece.freeze(p);
            board.getNewPiece();
            
        }else {
            board.piece.move(p)        
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











