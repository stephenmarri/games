var canvas = document.getElementById('myCanvas');
/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;
var dx =2;
var dy = -2;
var ballRadius = 10;
//paddle
var paddleHeight = 10;
var paddleWidth=75;
var paddleX=(canvas.width-paddleWidth)/2;
//buttons
var rightPressed = false;
var leftPressed = false;
//bricks
var brickRowCount = 1;
var brickColumnCount =5;
var brickWidth = 75;
var brickHeight =20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
// 
var score = 0;
var speed = 15;
var lives = 3;

var bricks = [];



//media query
if (window.matchMedia("(max-width: 600px)").matches) {
    canvas.width = 320;
    canvas.height = 240;
    brickRowCount = 3;
    brickColumnCount =5;
    y = canvas.height-40;
    paddleWidth=45;
    brickWidth = 45;
  } 

//media query




for(var c=0;c<brickColumnCount;c++){
    bricks[c]=[];
    for(var r=0;r<brickRowCount;r++){
        bricks[c][r]={x:0,y:0, status:1}
    }
};




function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //move paddle
    if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }

    drawScore();
    drawLives();
    drawBricks();
    drawPaddle();
    drawBall();   
    collisionDetection(); 
    if(y+dy<ballRadius){
        dy=-dy;
    }
    else if (y + dy > canvas.height-(ballRadius+paddleHeight) && ( x<paddleX+(paddleWidth) && x>(paddleX))) {
        dy=-dy;
        
    }else if (y + dy > canvas.height-ballRadius) {
        lives--;
        if (!lives) {            
            ctx.clearRect(0,0,canvas.width,canvas.height);
            drawScore();
            drawLives();
            gameComplete("Game Over!!!");                
            clearInterval(interval);    

        }else{
            x = canvas.width/2;
            y= canvas.height-30;
            dx=2;
            dy=-2;
            paddleX= (canvas.width-paddleWidth)/2;
        }

    }
    if(x+dx<ballRadius || x+dx>canvas.width-ballRadius){
        dx=-dx;
    }

    x+=dx;
    y+=dy;
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle="#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks(){
    for(var c=0;c<brickColumnCount;c++){        
        for(var r=0;r<brickRowCount;r++){
            if (bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x=brickX;
                bricks[c][r].y=brickY;
                ctx.beginPath();
                ctx.rect(brickX,brickY,brickWidth,brickHeight);
                ctx.fillStyle="#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    };
}

function collisionDetection(){
    for(var c=0;c<brickColumnCount;c++){        
        for(var r=0;r<brickRowCount;r++){
            var b = bricks[c][r];            
            if( x > b.x && x < b.x+brickWidth && y>b.y && y <b.y+brickHeight && b.status == 1  ){
                dy = -dy;
                score++;

                if (score== brickColumnCount*brickRowCount) {
                    ctx.clearRect(0,20,canvas.width,canvas.height);
                    gameComplete("You Won!!!");        
                    //document.location.reload();
                    clearInterval(interval);
                    score=0;
                }


                b.status=0;
                drawBricks();
            }
        }
    };
}

function drawScore(){
    ctx.font ="16px Calibri";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20)
}

function drawLives(){
    ctx.font ="16px Calibri";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width-65, 20)
}



function gameComplete(message){
    ctx.font ="30px Calibri";
    ctx.fillStyle = "#0095DD";
    ctx.textAlign = "center";
    ctx.fillText(message, canvas.width/2, canvas.height/2)
}



function keyDownHandler(e){
    if (e.key =="Right" || e.key == "ArrowRight") {
        rightPressed =true;
    }
    if (e.key =="Left" || e.key == "ArrowLeft") {
        leftPressed =true;
    }
}
function keyUpHandler(e){
    if (e.key =="Right" || e.key == "ArrowRight") {
        rightPressed =false;
    }
    if (e.key =="Left" || e.key == "ArrowLeft") {
        leftPressed =false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}


document.addEventListener('keydown',keyDownHandler,false);
document.addEventListener('keyup',keyUpHandler,false);
document.addEventListener("mousemove",mouseMoveHandler,false);
document.addEventListener("touchmove",mouseMoveHandler,false);


var interval = setInterval(draw,speed);