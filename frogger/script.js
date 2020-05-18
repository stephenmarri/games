let canvas = document.getElementById('myCanvas');
canvas.width= "505";
canvas.height = "441";
  /** @type {CanvasRenderingContext2D}  */
let ctx = canvas.getContext("2d");

//############################################## globals
(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
  })();
var animationID;
var keys = [];
var frameCount=0;
var gameStatus = false;
//############################################## tile
let tileHeightFull = 121;
let shadowHeight = 41;
let tileHeight = tileHeightFull-shadowHeight;
let tileWidth = 101;
let tileRows = 5;
let tileColumns = 5;

//############################################## images
const waterTile = new Image();
waterTile.src = 'images/water-block.png';
const stoneTile = new Image();
stoneTile.src = 'images/stone-block.png';
const grassTile = new Image();
grassTile.src = 'images/grass-block.png';
const heroImg = new Image();
heroImg.src = 'images/char-boy.png';
const bugImg = new Image();
bugImg.src = 'images/enemy-bug.png';
const bgTileSectioning = [waterTile,stoneTile,stoneTile,stoneTile,grassTile];

//############################################## hero
let heroBaseline = canvas.height - shadowHeight - tileHeight;
var heroX;
var heroDX = tileWidth;
var heroY;
var heroDY = tileHeight;

//############################################## bugs
var bugsArray = [];
var bugDX = 5;
var bugDXmax = 5;
var bugDXmin = 20;
var bugPrevFrameCount = 0;
var maxNoOfBugs = 6;
var bugGeneFrameCount = 0; 

//##############################################

window.addEventListener('load',()=>{
    constructAllTiles();
    gameStatus = true;
    main();
})

function main(){
    if(!gameStatus)return;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    constructAllTiles();
    keyPressed();
    generateNewBug();
    cosntructHero();
    keys=[];
    moveBugs();
    requestAnimationFrame(main);
    frameCount++;
}

//############################################## draw

function drawTile(img,dx,dy){
    ctx.beginPath();
    ctx.drawImage(// Image
      img,
      // ---- Selection ----
      0, // sx
      img.height - tileHeightFull, // sy
      img.width, // sWidth
      tileHeightFull, // sHeight
      // ---- Drawing ----
      dx, // dx
      dy, // dy
      img.width, // dWidth
      tileHeightFull // dHeight 
      );    
      ctx.closePath();
  }

function drawHero(img,dx,dy){
    ctx.beginPath();
    ctx.drawImage(// Image
      img,
      // ---- Selection ----
      0, // sx
      61, // sy
      img.width, // sWidth
      img.height, // sHeight
      // ---- Drawing ----
      dx, // dx
      dy, // dy
      img.width, // dWidth
      img.height // dHeight 
      );    
      ctx.closePath();
  }

function drawBug(img,dx,dy){
    ctx.beginPath();
    ctx.drawImage(// Image
      img,
      // ---- Selection ----
      0, // sx
      71, // sy
      img.width, // sWidth
      img.height, // sHeight
      // ---- Drawing ----
      dx, // dx
      dy, // dy
      img.width, // dWidth
      img.height // dHeight 
      );    
      ctx.closePath();
  }
  
function constructAllTiles(){
    for(let i =0; i< tileRows; i++){
        for(let j= 0; j< tileColumns; j++){
            drawTile(bgTileSectioning[i],j*(tileWidth),i*(tileHeight));
        }
    }
}

function cosntructHero(){
    let randomX;
    if(heroX == null) {
        randomX = genRandInt(0,tileColumns);
        heroX = randomX*tileWidth; heroY = heroBaseline;
    }
    drawHero(heroImg,heroX,heroY);
}

function generateNewBug(){
    if(bugsArray.length < maxNoOfBugs && genRandInt(0,20) == 1 && frameCount - bugGeneFrameCount > 20){
        console.log(bugsArray.length);
        bugGeneFrameCount = frameCount;
        let bugObj = {};
        bugObj.x = 0;
        bugObj.y = genRandInt(1,4)*tileHeight;
        bugObj.dx = genRandInt(bugDXmin,bugDXmax);
        bugsArray.push(bugObj);
        drawBug(bugImg,bugObj.x,bugObj.y);
    }
    
}

function moveBugs(){
    let move = 0;
    if(frameCount - bugPrevFrameCount > 5){
        bugPrevFrameCount = frameCount;  
        move = 1;      
    }    
    for(let i = 0; i<bugsArray.length;i++){
        
        if(bugsArray[i].x > canvas.width){
            bugsArray.splice(i,1)
        }else{
        bugsArray[i].x = bugsArray[i].x + (bugsArray[i].dx*move);
        drawBug(bugImg,bugsArray[i].x,bugsArray[i].y);
        }
        
        //collision detection
        let bw = bugsArray[i].x + bugImg.width - 20;
        if(bw > heroX && bw < heroX + heroDX && heroY == bugsArray[i].y){
            console.log(heroY,bugsArray[i].y);
            alert('You Lost');
            gameStatus = false;
            return;
        }
    }    
}



//############################################## move

// window.addEventListener("keydown", ()=>keys[event.keyCode] = true);
window.addEventListener("keydown", ()=>keys[event.keyCode] = true);


function keyPressed() {
    if (keys[37]) {  //left
        if (heroX>0) {
        heroX-=heroDX;
        }        
    }
    if (keys[39]) { //right
        if(canvas.width - heroX > heroDX) {
            heroX += heroDX;
        }  
    }
    if (keys[38]) { //up
        if(heroY - heroDY >= 0) {
            heroY -= heroDY;
        }  
    }
    if (keys[40]) { //down
        if(heroDY + heroY < (canvas.height- shadowHeight)) {
            heroY += heroDY;
        }  
    }
}


//############################################## helper
function genRandInt(min,max){
    return Math.floor(Math.random()*(max-min)+min)
}