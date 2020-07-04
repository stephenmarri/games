class Board{

    size = gSize;
    matrix = new Array(this.size);
    set = [2,4]
    colors = {
        2: "#eee4da",
        4: "#ede0c8"
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
    }

    genRandom(max){
       return Math.floor(Math.random()*max)
    }

    drawBoard(){
        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){
                let html = document.querySelector(`[data-id="${i}${j}"]`);
                if(this.matrix[i][j]>0){
                    html.innerHTML=`<span>${this.matrix[i][j]}</span>`;
                    html.classList.add('active')
                    html.style.backgroundColor = this.colors[this.matrix[i][j]]
                }else{
                    html.innerHTML="";
                    html.classList.remove('active')
                    html.style.backgroundColor = "rgba(238, 228, 218, 0.35)"
                }
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

}