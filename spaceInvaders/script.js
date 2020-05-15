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

// ###################################################################
let spriteBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAEACAYAAAADRnAGAAACGUlEQVR42u3aSQ7CMBAEQIsn8P+/hiviAAK8zFIt5QbELiTHmfEYE3L9mZE9AAAAqAVwBQ8AAAD6THY5CgAAAKbfbPX3AQAAYBEEAADAuZrC6UUyfMEEAIBiAN8OePXnAQAAsLcmmKFPAQAAgHMbm+gbr3Sdo/LtcAAAANR6GywPAgBAM4D2JXAAABoBzBjA7AmlOx8AAEAzAOcDAADovTc4vQim6wUCABAYQG8QAADd4dPd2fRVYQAAANQG0B4HAABAawDnAwAA6AXgfAAAALpA2uMAAABwPgAAgPoAM9Ci/R4AAAD2dmqcEQIAIC/AiQGuAAYAAECcRS/a/cJXkUf2AAAAoBaA3iAAALrD+gIAAADY9baX/nwAAADNADwFAADo9YK0e5FMX/UFACA5QPSNEAAAAHKtCekmDAAAAADvBljtfgAAAGgMMGOrunvCy2uCAAAACFU6BwAAwF6AGQPa/XsAAADYB+B8AAAAtU+ItD4OAwAAAFVhAACaA0T7B44/BQAAANALwGMQAAAAADYO8If2+P31AgAAQN0SWbhFDwCAZlXgaO1xAAAA1FngnA8AACAeQPSNEAAAAM4CnC64AAAA4GzN4N9NSfgKEAAAAACszO26X8/X6BYAAAD0Anid8KcLAAAAAAAAAJBnwNEvAAAA9Jns1ygAAAAAAAAAAAAAAAAAAABAQ4COCENERERERERERBrnAa1sJuUVr3rsAAAAAElFTkSuQmCC";
const tank = new Image();
tank.src = spriteBase64;
// ###################################################################


var spritUnitHeight = 35;
var spriteUnitWidth = 64;
var tankX=canvas.width/2;
var tankdX = 4;
var tankY=canvas.height-spritUnitHeight/2;
var tankWidth= spriteUnitWidth/2;
var tankHeight =spritUnitHeight/2
var keys =[];

window.onload = function init() {
  gameLoop();
}






// ###################################################################
// main game  
// ###################################################################

function gameLoop(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  keyPressed();
  drawTank(tankX,tankY);  
  requestAnimationFrame(gameLoop);
  console.log("x");
}






// ###################################################################
// event listeners
// ###################################################################

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
// draw functions
// ###################################################################

function drawInvader(x,y){
const invader = new Image();
invader.src = spriteBase64;
invader.onload = () => {
  ctx.drawImage(// Image
    invader,
    // ---- Selection ----
    0, // sx
    0, // sy
    spriteUnitWidth, // sWidth
    spritUnitHeight, // sHeight
    // ---- Drawing ----
    x, // dx
    y, // dy
    spriteUnitWidth/3, // dWidth
    spritUnitHeight/3 // dHeight 
    )
};
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

