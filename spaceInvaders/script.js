// //media queries
// let canvas = document.getElementById('myCanvas');
// /** @type {CanvasRenderingContext2D}  */
// let ctx = canvas.getContext("2d");
// if (window.matchMedia("(max-width: 500px)").matches) { // If media query matches
//     canvas.width = 320;
//     canvas.height = 480;
//   } 
// //media queries


let canvas = document.getElementById('myCanvas');
  /** @type {CanvasRenderingContext2D}  */
  let ctx = canvas.getContext("2d");
//globals
(function () {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

// ################################################################### load sprites
let spriteBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAEACAYAAAADRnAGAAACGUlEQVR42u3aSQ7CMBAEQIsn8P+/hiviAAK8zFIt5QbELiTHmfEYE3L9mZE9AAAAqAVwBQ8AAAD6THY5CgAAAKbfbPX3AQAAYBEEAADAuZrC6UUyfMEEAIBiAN8OePXnAQAAsLcmmKFPAQAAgHMbm+gbr3Sdo/LtcAAAANR6GywPAgBAM4D2JXAAABoBzBjA7AmlOx8AAEAzAOcDAADovTc4vQim6wUCABAYQG8QAADd4dPd2fRVYQAAANQG0B4HAABAawDnAwAA6AXgfAAAALpA2uMAAABwPgAAgPoAM9Ci/R4AAAD2dmqcEQIAIC/AiQGuAAYAAECcRS/a/cJXkUf2AAAAoBaA3iAAALrD+gIAAADY9baX/nwAAADNADwFAADo9YK0e5FMX/UFACA5QPSNEAAAAHKtCekmDAAAAADvBljtfgAAAGgMMGOrunvCy2uCAAAACFU6BwAAwF6AGQPa/XsAAADYB+B8AAAAtU+ItD4OAwAAAFVhAACaA0T7B44/BQAAANALwGMQAAAAADYO8If2+P31AgAAQN0SWbhFDwCAZlXgaO1xAAAA1FngnA8AACAeQPSNEAAAAM4CnC64AAAA4GzN4N9NSfgKEAAAAACszO26X8/X6BYAAAD0Anid8KcLAAAAAAAAAJBnwNEvAAAA9Jns1ygAAAAAAAAAAAAAAAAAAABAQ4COCENERERERERERBrnAa1sJuUVr3rsAAAAAElFTkSuQmCC";
const tank = new Image();
tank.src = spriteBase64;
const invader = new Image();
invader.src = spriteBase64;
// ###################################################################

var frameCount=0;
var armyPrevFrameCount=0;
var framesInOneSec = 1000/16;
var spritUnitHeight = 34;
var spriteUnitWidth = 64;
var tankX=canvas.width/2;
var tankdX = 4;
var tankY=canvas.height-spritUnitHeight/2;
var tankWidth= spriteUnitWidth/2;
var tankHeight =spritUnitHeight/2
var keys =[];

// ################################################################### Invaders rows columns
var invaderWidth = spriteUnitWidth/3;
var invaderHeight = spritUnitHeight/3;
var invaderSpriteHeight = spritUnitHeight;
var armyRows = 5;
var armyColumns = 10;
var armyX = 60;
var armyY = 60;
var invaderLeftOffset = 15;
var invaderTopOffset = 20;
var armyDirection = "right";
var armyDx = 2;
var armyDy = 5;
var armySpeed = 20;  
var armyArray = [];



// ###################################################################












// ################################################################### main game loop
window.onload = function init() {
  constructArmy(armyX,armyY);
  gameLoop();
}

function gameLoop(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  moveArmy();
  drawArmyOfInvaders();
  keyPressed();
  drawTank(tankX,tankY);  
  requestAnimationFrame(gameLoop);
  frameCount++;
  console.log(frameCount);
}
// ###################################################################







// ################################################################### event listeners
window.addEventListener("keydown", ()=>keys[event.keyCode] = true);
window.addEventListener("keyup", ()=>keys[event.keyCode] = false);
function keyPressed() {
  if (keys[37]) {     
    if (tankX-tankdX>0) {
      tankX-=tankdX;
    }
  }
  if (keys[39]) {
    if(canvas.width - (tankX+tankWidth) > tankdX) {
      tankX+=tankdX;
    }  
  }
}
// ###################################################################





// ################################################################### draw functions
function drawInvader(x,y,sHeight){
  ctx.beginPath();
  ctx.drawImage(// Image
    invader,
    // ---- Selection ----
    0, // sx
    sHeight, // sy
    spriteUnitWidth, // sWidth
    spritUnitHeight, // sHeight
    // ---- Drawing ----
    x, // dx
    y, // dy
    invaderWidth, // dWidth
    invaderHeight // dHeight 
    );    
    ctx.closePath();
}


function drawTank(x,y){
  ctx.beginPath();
  ctx.drawImage(// Image
    tank,
    // ---- Selection ----
    0, // sx
    tank.height-50, // sy
    tank.width, // sWidth
    spritUnitHeight, // sHeight
    // ---- Drawing ----
    x, // dx
    y, // dy
    tankWidth, //42, // dWidth
    tankHeight //24 // dHeight 
    );
ctx.closePath();
}


function moveArmy(){
  if(frameCount-armyPrevFrameCount>armySpeed){
    armyPrevFrameCount=frameCount;
    invaderSpriteHeight=spritUnitHeight-invaderSpriteHeight;
  }
  else{
    return false;
  }
  let dx;
  if (armyDirection == 'right') {
    if(canvas.width - (armyX + (invaderWidth+invaderLeftOffset)*(armyColumns-1)) > invaderWidth){
      dx=1;
    }else{
      armyDirection='left';
      dx=-1;
    }
            
  } else
  if (armyDirection == 'left') {
      if (armyX-armyDx>0) {
      dx=-1;        
      }else{
        armyDirection='right';
        dx=1;
      }
      
  }

  armyX+=armyDx*(dx);
  constructArmy(armyX,armyY);
}


function constructArmy(aX,aY){
  for (let i = 0; i < armyRows; i++) {
    armyArray[i]=[];
    for(let j = 0; j < armyColumns; j++){
      armyArray[i][j]={
        x: aX + j*(invaderWidth + invaderLeftOffset),
        y:aY + i*(invaderHeight + invaderTopOffset),
        status:"alive"
      };
    }
  }
}

function drawArmyOfInvaders(){
  for (let i = 0; i < armyRows; i++) {
    for(let j = 0; j < armyColumns; j++){
        let soldier = armyArray[i][j];
        drawInvader(soldier.x,soldier.y,invaderSpriteHeight);
      
      
    }
  }  
}

// ###################################################################


