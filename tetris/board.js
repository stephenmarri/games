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
        this.isLineComplete();
    }

    getNewPiece(){
        this.piece = new Piece(this.ctx)   
    }

    getEmptyBoard(){
        return Array.from({length: wellRows}, ()=> Array(wellColumns).fill(0) )
    }

    isLineComplete(){
        let lines = []
        for (let x = 0; x < wellRows; x++) {
            let isComp = true;
            for (let y = 0; y < wellColumns; y++) {
                if (well[x][y] == 0){
                    isComp = false;
                    // console.log(`${x}: false`);
                }
            }
            if(isComp)lines.push(x);            
        }
        if(lines.length>0) {
            console.log(lines)
            for(let k=0; k<lines.length;k++){
                well.splice(lines[k],1);                
                well.unshift(Array(wellColumns).fill(0));
            }
        console.table(well)

        };
        return 1
    }


    rotate(piece) {
        // Clone with JSON for immutability.
        let p = JSON.parse(JSON.stringify(piece));
    
        // Transpose matrix
        for (let y = 0; y < p.shape.length; ++y) {
          for (let x = 0; x < y; ++x) {
            [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
          }
        }

        // Reverse the order of the columns.
    p.shape.forEach(row => row.reverse());
    return p;
  }
}