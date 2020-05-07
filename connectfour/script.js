//global params
var gameRunning=false;
var gameContainer = document.querySelector('.game-container');
var clickedItemArr = [];
var currentPlayer=0;
var cssProperties = getComputedStyle(document.body);
var pOneColor = cssProperties.getPropertyValue('--playerOne-color');
var pTwoColor = cssProperties.getPropertyValue('--playerTwo-color');
var hover__color = cssProperties.getPropertyValue('--playerTwo-color');
var playerColors =[pOneColor,pTwoColor];
var rowIndex;

for(i=0;i<7;i++){
    var arr = []
    for(j=0;j<6;j++){        
        arr.push(0);            
    }
    clickedItemArr.push(arr);
};

// main

var  startButton = document.querySelector('.startTrigger');
startButton.addEventListener('click', async function (){
    startButton.classList.add('clicked');
    startButton.textContent="Game is On!";
    gameRunning=true;
    document.documentElement.style.setProperty('--column-hover-color','wheat');

});
// main



    
//var clickedCol, clickedColRow;
gameContainer.addEventListener('click',async (event)=>{
    if(!gameRunning) return;     
    clickedCol = event.target.parentNode.getAttribute('id');
    clickedColRow = event.target.getAttribute('id');
    const clicked = await checkColEmptyAndClick(clickedCol,currentPlayer);    
    if(clicked){
        await colorBlock(clickedCol, rowIndex+1);
        await chekcIfWon(currentPlayer+1);
        currentPlayer=1- currentPlayer;        
    }    

    // console.log(clickedItemArr);
});


//check if column is empty
async function checkColEmptyAndClick(col,player){
    
    if(clickedItemArr[col-1].includes(0)){
        rowIndex = clickedItemArr[col-1].lastIndexOf(0);        
        clickedItemArr[col-1][rowIndex]=1+player; 
        console.log(clickedItemArr[col-1]);
        return true;
    }   
    console.log(`clicked on col: ${col}`);
    console.log(clickedItemArr[col-1]);
    console.log(clickedItemArr[col-1].includes(0))
    

    return false;    
}


//color a block
async function colorBlock(col, row){    
    var item = document.querySelector(`.game-container #${CSS.escape(col)} #${CSS.escape(row)}`);
    item.style.background = playerColors[currentPlayer];
}

//chekc if current player has won
async function chekcIfWon(player){
    
}
