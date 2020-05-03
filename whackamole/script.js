function playGame(){
    var grid = document.querySelectorAll('.block');
var hitPosition;
var score = 0; 
var pointGainedOnce=0;

//timer
var timer__html = document.querySelector('#timer');
var timeLeft = 5;

var timerID = setInterval(function(){
    if (timeLeft<1) {
        clearInterval(timerID);
        gameStatus="stale";
        document.querySelector('#play__text').textContent='Play Again';
        startButton.style.background='#27ae60';    
        startButton.style.fontWeight='Initial'; 
    }

    timer__html.textContent=timeLeft;
    timeLeft--;
 }, 1000);

//game

function popTom(randomBLockNo){
    
    grid[randomBLockNo].classList.add("tom");
}

function removeTom(){
    grid.forEach(element => {
        element.classList.remove("tom");
    });
}

grid.forEach(element => {
    element.addEventListener('click',()=>{
        if(element.id == hitPosition+1 && timeLeft > 0 && pointGainedOnce){
            score++;
            document.querySelector('#score__text').textContent = score; 
            pointGainedOnce=0;           
        }
    })
});




var tomTimer = setInterval(() => {
    if (timeLeft < 1) {
        clearInterval(tomTimer)
    }
    removeTom();
    let randomBLockNo = Math.floor((Math.random())*16);
    hitPosition = randomBLockNo;
    popTom(randomBLockNo);
    pointGainedOnce=1;
}, 1000);

}


var startButton = document.querySelector('.controls');
var gameStatus = "stale";

startButton.addEventListener('click',()=>{
    if (gameStatus == "stale") {
        playGame();
        gameStatus='Running';
        startButton.style.background='#2980b9';     
        document.querySelector('#play__text').textContent='Game is ON!!'; 
    }   

})