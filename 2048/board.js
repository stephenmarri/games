class Board{

    size = gSize;
    matrix = new Array(this.size);
    set = [2,4]
    colors = {
        2: "#eee4da",
        4: "#ede0c8",
        8: "#f2b179",
        16: "#f59563",
        32: "#f67c5f",
        64: "#f65e3b",
        128: "#edcf72",
        256: "#edcc61",
        512: "#edc850",
        1024: "#edc53f",
        2048: "#edc22e"
    
    }
    


    createEmptyBoard() {
        for(let i=0;i<this.size;i++){
            this.matrix[i] = new Array(this.size).fill(0)
        }
    }   

    createNewGame(){
        this.createEmptyBoard()
        this.genNewTile()
        this.genNewTile()
        this.drawBoard()
    }


    genNewTile(){
        let value = this.set[this.genRandom(this.set.length)];
        let emptyPos =[];

        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){
                if(this.matrix[i][j]==0){
                    emptyPos.push([i,j])
                }
            }
        }

        let max = emptyPos.length;
        let rand = this.genRandom(max);
        let x = emptyPos[rand][0]
        let y = emptyPos[rand][1]
        this.matrix[x][y]=value;
        this.removeClass('born')
        document.querySelector(`[data-id="${x}${y}"]`).classList.add('born')
    }

    genRandom(max){
       return Math.floor(Math.random()*max)
    }

    drawBoard(){
        this.gameOver()
        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){
                let html = document.querySelector(`[data-id="${i}${j}"]`);
                if(this.matrix[i][j]>0){
                    html.innerHTML=`<span>${this.matrix[i][j]}</span>`;
                    html.classList.add('active')
                    
                    //style validations
                    if(this.matrix[i][j]>1000)html.style.fontSize = "3rem"                  
                    if(this.matrix[i][j]<=2048){                    
                        html.style.backgroundColor = this.colors[this.matrix[i][j]]
                    }else{                        
                        html.style.backgroundColor = this.colors["2048"]
                    }
                    //text color
                    if(this.matrix[i][j]>4){
                        html.style.color = "#f9f6f2";
                    }else{
                        html.style.color = "#776e65";
                    }
                }else{
                    html.innerHTML="";
                    html.classList.remove('active')
                    html.style.backgroundColor = "rgba(238, 228, 218, 0.35)"
                }
            }
        }
    }

    arrangeFour(a,b,c,d){
        let p=[a,b,c,d];
        let ded = [false, false ,false, false]
        let uLimit = 3;
        for(let i = 2; i >= 0; i--){
            let target = i;
            let next = i+1;
            let double = 0
            for(let j = i+1; j<= uLimit;j++){
                if(p[i]==0)break
                //if next block is filled
                if(p[j]!=0){
                    if(p[j]!=p[i]){
                        break
                    }else{
                        if(!ded[j]){
                            target = j
                            double = 1
                            ded[target] = true
                        }
                        uLimit--                        
                        break
                    }
                }else{
                    //if next block is empty
                    target = j;
                }
            }
            
            if(target != i){
                p[target] = p[i] + ( double * p[i])
                score.textContent = parseInt(score.textContent) + (p[target]*double)
                p[i]=0;
                moved=true
            }
        }
    
        return p
    }

    cDown(){
        for(let i=0; i< this.size; i++){
            let cArr=[];
            for(let j=0; j< this.size ; j++){
                 cArr.push(this.matrix[j][i])
            }
            cArr =  this.arrangeFour(cArr[0],cArr[1],cArr[2],cArr[3])
            for(let k=0;k<this.size;k++){
                if((this.matrix[k][i])*2 == cArr[k] && cArr[k]>0){
                    document.querySelector(`[data-id="${k}${i}"]`).classList.add('double')                    
                }
                
                this.matrix[k][i] = cArr[k]

            }
        }
    }

    cUp(){
        for(let i=0; i< this.size; i++){
            let cArr=[];
            for(let j=0; j< this.size ; j++){
                 cArr.push(this.matrix[j][i])
            }
            cArr =  this.arrangeFour(cArr[3],cArr[2],cArr[1],cArr[0])
            for(let k=0;k<this.size;k++){
                if((this.matrix[k][i])*2 == cArr[3-k] && cArr[3-k]>0){
                    document.querySelector(`[data-id="${k}${i}"]`).classList.add('double')                    
                }
                this.matrix[k][i] = cArr[3-k]
            }
        }
    }

    cLeft(){
        for(let i=0; i< this.size; i++){
            let cArr=[];
            for(let j=0; j< this.size ; j++){
                 cArr.push(this.matrix[i][j])
            }
            cArr =  this.arrangeFour(cArr[3],cArr[2],cArr[1],cArr[0])        
            for(let k=0;k<this.size;k++){
                if((this.matrix[i][k])*2 == cArr[3-k] && cArr[3-k]>0){
                    document.querySelector(`[data-id="${i}${k}"]`).classList.add('double')                    
                }
                this.matrix[i][k] = cArr[3-k]
            }
        }
    }

    cRight(){
        for(let i=0; i< this.size; i++){
            let cArr=[];
            for(let j=0; j< this.size ; j++){
                 cArr.push(this.matrix[i][j])
            }
            cArr =  this.arrangeFour(cArr[0],cArr[1],cArr[2],cArr[3])        
            for(let k=0;k<this.size;k++){
                if((this.matrix[i][k])*2 == cArr[k] && cArr[k]>0){
                    document.querySelector(`[data-id="${i}${k}"]`).classList.add('double')     
                }
                this.matrix[i][k] = cArr[k]
            }
        }
    }
    

    calcDown(){
        for(let row = this.size-1; row>0;row--){
            for(let col = 0; col< this.size;col++){
                //for each tile 
                //console.group(row,col);
                let currValue = this.matrix[row][col];
                //console.log(currValue);

                for(let d = row-1; d>=0;d--){
                    let tValue = this.matrix[d][col];
                    // if value == 0
                    if(currValue == 0){
                            if(tValue != 0){
                                this.matrix[row][col] = tValue;
                                this.matrix[d][col] = 0;
                                break;
                            }
                        }else{
                            if(tValue!=0){
                                if(tValue == currValue){
                                    this.matrix[row][col] = currValue*2;
                                    this.matrix[d][col] = 0;
                                }else{
                                    this.matrix[d][col] = 0;
                                    this.matrix[row-1][col] = tValue;
                                }
                                break;
                            }

                        }
                    }
                }
            //console.groupEnd(row,col);

        }
    }    

    calcUp(){
        for(let row = 0; row < this.size-1; row++){
            for(let col = 0; col< this.size;col++){
                //for each tile 
                //console.group(row,col);
                let currValue = this.matrix[row][col];
                //console.log(currValue);

                for(let d = row+1; d < this.size;d++){
                    let tValue = this.matrix[d][col];
                    // if value == 0
                    if(currValue == 0){
                            if(tValue != 0){
                                this.matrix[row][col] = tValue;
                                this.matrix[d][col] = 0;
                                break;
                            }
                        }else{
                            if(tValue!=0){
                                if(tValue == currValue){
                                    this.matrix[row][col] = currValue*2;
                                    this.matrix[d][col] = 0;
                                }else{
                                    this.matrix[d][col] = 0;
                                    this.matrix[row+1][col] = tValue;
                                }
                                break;
                            }

                        }
                    }
                }
            //console.groupEnd(row,col);

        }
    }    

    removeClass(cname){
        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){
                let html = document.querySelector(`[data-id="${i}${j}"]`);
                html.classList.remove(cname);
            }
        }
    }

    gameOver(){ 
        let hasZero = false
        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){
                if(this.matrix[i][j]==0){
                    hasZero = true;
                }
            }
        }
        if(!hasZero){
            
        }
    }

}