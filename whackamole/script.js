var grid = document.querySelectorAll('.block');


//timer
var timer__html = document.querySelector('#timer');
var timeLeft = 10;

var timerID = setInterval(function(){
    if (timeLeft==0) {
        clearInterval(timerID)
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


var tomTimer = setInterval(() => {
    if (timeLeft==0) {
        clearInterval(tomTimer)
    }
    removeTom();
    let randomBLockNo = Math.floor((Math.random())*16);
    popTom(randomBLockNo);
}, 700);

