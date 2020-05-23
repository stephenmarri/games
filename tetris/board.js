class Board{
    ctx;
    well;
    piece;

    constructor(ctx){
        this.ctx = ctx;  
        this.getNewPiece();            
    }

    draw(){
        this.piece.draw();
        this.drawBoard();
    }

    drawBoard(){
        for (let x = 0; x < wellColumns; x++) {
            for (let y = 0; y < wellRows; y++) {
                if (well[y][x] > 0){
                    ctx.fillStyle = colors[well[y][x]];
                    ctx.fillRect(x*(singleBlockSize),y*(singleBlockSize), blockActualParam , blockActualParam);
                }
            }
            
        }
    }

    getNewPiece(){
        this.piece = new Piece(this.ctx)   
    }

    getEmptyBoard(){
        return Array.from({length: wellRows}, ()=> Array(wellColumns).fill(0) )
    }
}