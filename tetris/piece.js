const singleBlockSize = 22;
const blockActualParam = 20;
const wellColumns = 10;
const wellRows = 22;
var well ;

//  I J L O S T Z
const shapes = [ 
    [],
    [ [1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0] ],
    [ [2,0,0],[2,2,2],[0,0,0]],
    [ [0,0,3],[3,3,3],[0,0,0]],
    [ [4,4],[4,4]],
    [ [0,5,5],[5,5,0],[0,0,0]],
    [ [6,6,6],[0,6,0],[0,0,0]] ,
    [ [7,7,0],[0,7,7],[0,0,0]]    
];

const colors =[
    'none',
    'cyan',
    'blue',
    'orange',
    'yellow',
    'green',
    'purple',
    'red'
];



class Piece{
    x;
    y;
    color;
    shape;
    ctx;
    id;
    rBottom;

    constructor(ctx){
        this.ctx = ctx;
        this.spawn();
        this.x=3;
        this.y=0; 
        this.rBottom = 0;
    }

    spawn(){
        this.id = this.generateRandom(colors.length - 1);
        this.shape = shapes[this.id];
        this.color = colors[this.id]
    }

    draw(){
        this.ctx.fillStyle = this.color;        
        this.shape.forEach((row, y) => {
            row.forEach((value,x) => {
                if(value > 0){
                    //well[y][x]=value;                    
                    ctx.fillRect(this.x*(singleBlockSize) + x*(singleBlockSize),this.y*(singleBlockSize) + y*(singleBlockSize),blockActualParam, blockActualParam);
                }
            })
        });
    }

    move(p){        
        if(this.validLR(p)){
            this.x = p.x;
        this.y = p.y;
        this.shape = p.shape;
        }        
    }

    generateRandom(max){
        return Math.floor(Math.random()*max + 1)
    }

    validLR(p){                

        let leftX, rightX=0;
        for(let col=0;col<p.shape[0].length;col++){
            let sum=0;
            for(let row = 0; row<p.shape.length; row++){
                sum += p.shape[row][col];
            }
            if(sum>0){
                leftX = col;
                break                
            }          
        }
        for(let col=p.shape[0].length-1;col>=0;col--){
            let sum=0;
            for(let row = 0; row<p.shape.length; row++){
                sum += p.shape[row][col];
            }
            if(sum>0){
                rightX++;                              
            }          
        }
        console.log(`left is: ${p.x + leftX}, height is: ${p.y}`);
        if(p.x + leftX < 0 || p.x + leftX + rightX > wellColumns) return false;        
        return true;
    }

    reachedBottom(p){
        
        for (let i = p.shape.length-1; i >=0 ; i--) {
            const element = p.shape[i];
            const sum = element.reduce((a, b) => a + b, 0)
            if(sum > 0){
                if(p.y+i+1 >= wellRows){                    
                    //this.freeze(p);
                    // console.table(well)
                    return 1;
                }

                let currentY;
                currentY = p.y + i;
                for(let k =0; k<element.length;k++){
                    if(element[k] > 0){
                        if(well[currentY+1][p.x +k]>0){
                        //this.freeze(p);                        
                        return 1;
                    }
                    }
                    
                }              
                
            }
        }
        return 0;

        // for (let y = 0; y < p.shape.length; y++) {
        //     const row = p.shape[y];
        //     for (let x = 0; x < row.length; x++) {
        //         const item = p.shape[y][x];
        //             if(item > 0){
        //                 if(p.y>=15){
        //                     this.freeze(p)
        //                     return 1;
        //                 }
        //             }
        //     }            
        // }
        // return 0;
    }

    reachedEnd(p){        
        if(p.y == 12){
            console.log('reached end');
            this.freeze(p);
            return true
        }
    }



    freeze(p){        
        p.shape.forEach((row, y) => {
            row.forEach((value,x) => {
                if(value > 0){
                    well[p.y + y][p.x + x]=value;                                        
                }
            })
        });
    }

}