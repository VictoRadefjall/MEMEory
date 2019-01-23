// Card data
const cardsArray = [{
    'name': 'Late',
    'img': 'pics/late.jpg',
  },
  {
    'name': 'age',
    'img': 'pics/age.jpg',
  },
  {
    'name': 'beer',
    'img': 'pics/beer.jpg',
  },
  {
    'name': 'smile',
    'img': 'pics/smile.jpg',
  },
  {
    'name': 'yeah',
    'img': 'pics/yeah.jpg',
  },
  {
    'name': 'evil',
    'img': 'pics/Evil_toddler.png',
  },
];
//Skapar en div för spelinformation
  const gameinfo = document.getElementById('game-info');
  const container = document.createElement('div');
  gameinfo.appendChild(container);

// Skapar ett nytt element i index för att ge en spelplan.
  const game = document.getElementById('memory-game');
  const grid = document.createElement('section');
  grid.setAttribute('class', 'grid');
  game.appendChild(grid);

  let previousTarget = null;
  let gameGrid = cardsArray.concat(cardsArray); //Dubblar antalet kort så att man har 2 av varje.

  //importerad kod för timer och stjärnor
  const stars = document.querySelectorAll(".fa-star");
  // stars list
  let starsList = document.querySelectorAll(".stars li");
  let moves = 0;
  let counter = document.querySelector(".moves");

// Loopa igenom listan med kort som ska individualiseras.
gameGrid.sort(() => 0.5 - Math.random());

gameGrid.forEach(item => {
  const card = document.createElement('div');
  card.classList.add('card'); //Lägger till en class till kortet.
  card.dataset.name = item.name; // Lägger in meta-data attribut från arrayen.

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  card.style.backgroundImage = `url(${item.img})`;// Lägg till bild som bakgrund på spelkortet.

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

//Skapar en eventlistener för att upptäcka när det klickas
grid.addEventListener('click', function (event) {
  let clicked = event.target; //Event.target är det element man har klickat på.
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget) {
     return;
   }
  if (count < 2) {
    count ++;
    if (count === 1) { //Ger första gissningen
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else { //andra gissningen
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }
    if (firstGuess !== '' && secondGuess !== '') { //OM gissningarna INTE är tomma..
      if (firstGuess === secondGuess) { // och dom matchar..
        setTimeout (match, delay); // så körs match funktionen.
        setTimeout (resetGuesses, delay); // och Återställer gissningar
      } else {
        setTimeout (resetGuesses, delay);
      }
    }
    previousTarget = clicked;
  }
});
const resetGuesses = () => { // Funktionen som återställer gissningarna.
 firstGuess = '';
 secondGuess = '';
 count = 0;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

let delay = 1200; // En timer ger 1.2 sekunder att se valen man har gjort
let firstGuess = '';
let secondGuess = '';
let count = 0;

const match = () => { // Funktion som kontrollerar om de valda spelkorten är en matchning.
  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match')
    card.classList.remove('front','back', 'card', 'selected', 'match')
  });
}

//game timer
var second = 0, minute = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}
