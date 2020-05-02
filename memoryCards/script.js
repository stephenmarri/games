var cards = [];
var clickedImages=[];
var clickedDivs=[]
var imgs = ['one.jpg','two.jpg','three.jpg','four.jpg','five.jpg','six.jpg','one.jpg','two.jpg','three.jpg','four.jpg','five.jpg','six.jpg'];
var attempt = 0;
var gTimer;
var prevEvent;

Array.from(document.querySelectorAll('.card')).forEach(element => {
    cards.push(element);
});

imgs = shuffle(imgs);

//load images
for (let index = 0; index < cards.length; index++) {
    const element = cards[index];
    const unsolImg = document.createElement('img');
    //unsolImg.src=`images/${imgs[index]}`;
    unsolImg.src=`images/unsolved.jpg`;
    element.appendChild(unsolImg);    
}

//flip on click
var grid = document.querySelector('.game-container');
grid.addEventListener('click', function(event){
    console.log(gTimer);
    if(gTimer){
        prevEvent.target.setAttribute('src',`images/unsolved.jpg`);
        clearTimeout(gTimer);
        gTimer = null;
    }
    if ((event.target.getAttribute('src')).indexOf('unsolved') > 0) {
        attempt++;
        var cardId = event.target.parentNode.getAttribute('Id');
        event.target.setAttribute('src',`images/${imgs[cardId-1]}`);        
        
        //flip card
        if(!checkMatching(imgs[cardId-1],cardId)){

            var myTimer = setTimeout(() => event.target.setAttribute('src',`images/unsolved.jpg`),1000);
            prevEvent =  event;
            gTimer=myTimer;
            console.log(myTimer);
            //event.target.setAttribute('src',`images/unsolved.jpg`)                         
        }   
        //write to text bar
        if ((document.querySelector('.game-container').innerHTML.indexOf('unsolved')) > 0){
        document.querySelector('#result--textbar').textContent = `Attempts: ${attempt}`;
        }
        else{
            document.querySelector('#result--textbar').textContent = `You've Won!!! Attempts: ${attempt}`;
        }
    }
    
});


function checkMatching(item, divId ){
    clickedImages.push(item);
    clickedDivs.push(divId);
    console.log(clickedImages,clickedDivs);
    if (clickedImages.length == 2 ){
        var result = (clickedImages[0] === clickedImages[1] && clickedDivs[0]!=clickedDivs[1]);
        if (result) {
            //if success
            // setTimeout(() => {
            //     document.querySelector(`#${CSS.escape(clickedDivs[0])}`).firstChild.setAttribute('src',`images/${clickedImages[0]}`);
            //     document.querySelector(`#${CSS.escape(clickedDivs[1])}`).firstChild.setAttribute('src',`images/${clickedImages[0]}`); 
            // },500);
            // alert("matched");
            // sleep(5000).then(() => {
            // alert("start new action");
            // //do stuff
            //   })
            // document.querySelector(`#${CSS.escape(clickedDivs[0])}`).firstChild.setAttribute('src',`images/solved.jpg`);
            // document.querySelector(`#${CSS.escape(clickedDivs[1])}`).firstChild.setAttribute('src',`images/solved.jpg`);


            document.querySelector(`#${CSS.escape(clickedDivs[0])}`).firstChild.setAttribute('src',`images/${clickedImages[0]}`);
            document.querySelector(`#${CSS.escape(clickedDivs[1])}`).firstChild.setAttribute('src',`images/${clickedImages[0]}`);
            var successTimer = setTimeout(() => {
                document.querySelector(`#${CSS.escape(clickedDivs[0])}`).firstChild.setAttribute('src',`images/solved.jpg`);
                document.querySelector(`#${CSS.escape(clickedDivs[1])}`).firstChild.setAttribute('src',`images/solved.jpg`);
                clickedImages.shift();
                clickedDivs.shift();
            },1000);

        }        
        if (!successTimer) {
            clickedImages.shift();
            clickedDivs.shift();
        }        
        return result
    }    
}













//sleep
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }






//shuffle array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }