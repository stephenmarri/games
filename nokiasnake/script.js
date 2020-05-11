//root variables
let gridSize=20;
var gameGrid = document.querySelector('.game-container');
let incDirRight=1;
let incDirDown=gridSize;
let incDirLeft=-1;
let incDirUp=-gridSize;
var moveTrain;
var gameStatus = 'stale';

//root variables

//main
createGrid(gridSize);
numberTheGrids();
var startButton = document.querySelector('#startGame');
startButton.addEventListener('click',(event)=>{
    
    //stop the game
    if(event.currentTarget.textContent=='Stop'){
        event.currentTarget.textContent='Start';
        clearInterval(moveTrain);
        gameStatus='stale';

    }else{
        event.currentTarget.textContent='Stop';
        document.querySelector('#score__text').textContent=1;
        clearTheGrid();
        callGame();
        gameStatus='running';
    }
    
    
});



//main

// init functions

function numberTheGrids(){
    var tiles = document.getElementsByClassName('tile');
    Array.from(tiles).forEach(element => {
        element.childNodes[0].innerHTML = element.getAttribute('id').toString();
    });
}

function createGrid(rows){
    
    for (let i = 0; i < rows*rows; i++) {
        let divElement = document.createElement('div');
        divElement.className='tile';
        divElement.style.width=`calc(100% / ${gridSize})`;
        divElement.style.height=`calc(100% / ${gridSize})`;
        divElement.id=i.toString();
        divElement.innerHTML='<span></span>';
        gameGrid.appendChild(divElement);
    }    
}

function clearTheGrid(){
    let allTiles = document.getElementsByClassName('tile');
    Array.from(allTiles).forEach(element => element.classList.remove('active'));
}



// init functions

//------------------------Game---------------------------------------

function callGame(){
    startGame();
}

function startGame(){

var startTile=0;
var tileIndex=startTile;
var tileIncrement = 1;
var trainArray = [startTile];
var direction = 'right';

//generate stations for the train
generateRandomStation();


moveTrain = setInterval(async function() {  
    await ifCorner(tileIndex);
    tileIndex+=tileIncrement;
    if(await collided(tileIndex)){
        //game over
        alert('game over');
        clearInterval(moveTrain);
        gameStatus='stale';
        document.querySelector('#startGame').textContent='Start';
        return;
    };
    trainArray.push(tileIndex);    
    var isActive = await checkIfClassNameIsTitle(tileIndex);
    await addClassName(trainArray[trainArray.length-1]);
    await clearClassName(trainArray[0]);        
    if(isActive){
        await generateRandomStation();
        increaseScore();
    }
    else{
        trainArray.shift();
    }
    // tileIndex+=tileIncrement;   
    
    //if corner
    // await ifCorner(tileIndex);
}, 500);

async function clearClassName(index){
    let remtile = gameGrid.querySelector(`#${CSS.escape(index)}`);
    remtile.classList.remove('active');
}
async function addClassName(index){
    let remtile = gameGrid.querySelector(`#${CSS.escape(index)}`);
    remtile.classList.add('active');
}

async function checkIfClassNameIsTitle(index){
    let remtile = gameGrid.querySelector(`#${CSS.escape(index)}`);
    return remtile.classList.contains('active');
}

async function generateRandomStation(){

    var rNumber = Math.floor((Math.random())*(gridSize*gridSize));
    if(trainArray.includes(rNumber)){
        generateRandomStation();
    }
    else {
        let station = gameGrid.querySelector(`#${CSS.escape(rNumber)}`);
        station.classList.add('active');
    }
}

async function increaseScore(){
    let presentScore=document.querySelector('#score__text');
    presentScore.textContent=parseInt(presentScore.textContent)+1;
}

async function ifCorner(index){
    if (direction=='right' && (index+1)%gridSize==0) {
        tileIndex=index-gridSize;
    }
    else
    if (direction=='left' && (index)%gridSize==0) {
        tileIndex=index+gridSize;
    }else
    if (direction=='down' && (index)<(gridSize*gridSize) && (index)>=(gridSize*(gridSize-1))) {
        tileIndex=(index-(gridSize*(gridSize-1)))+20*(-1);
    }else
    if (direction=='up' && (index)<gridSize) {
        tileIndex=(gridSize*gridSize)+(index);        
    }
}

async function collided(index){
    return trainArray.includes(index);
}

async function changeDirection(dir){
    if (dir=='right') {
        tileIncrement=1;
        direction=dir;
    }
    if (dir=='left') {
        tileIncrement=-1;
        direction=dir;
    }
    if (dir=='down') {
        direction=dir;
        tileIncrement=gridSize;
    }
    if (dir=='up') {
        direction=dir;
        tileIncrement=-gridSize;
    }
    
}

//event listener on controls
var controls = document.querySelector('.controls');
controls.addEventListener('click',(event)=>{
    try {
        if(gameStatus=='stale') return false;    
        let dir = event.target.getAttribute('id').toString();
        changeDirection(dir)
    } catch (error) {
        console.log("error from controls function: " + error);
        return false;
    }
})



//closing bracket for function
}


//------------------------Game---------------------------------------