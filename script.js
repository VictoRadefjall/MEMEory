const allCards = [{
  'parId': '1',
  'img': 'html1.jpg',
},
{
  'parId': '2',
  'img': 'html2.jpg',
},
{
  'parId': '3',
  'img': 'css1.jpg',
},
{
  'parId': '4',
  'img': 'css2.jpg',
},
{
  'parId': '5',
  'img': 'js1.jpg',
},
{
  'parId': '6',
  'img': 'js2.jpg',
}];

//duplicerar korten
const doubleCards = allCards.concat(allCards);
doubleCards.sort(() => 0.5 - Math.random());


let firstCard = '';
let secondCard = '';
let count = 0;
let previousEvent = null;
let delay = 1200;
let matched = '';
let tries = '';
let yourScore = 24;
let matchedCards = document.getElementsByClassName('card match');
//hämtar diven memorygame & skapar sectioner
const game = document.getElementById('memory-game');
const board = document.createElement('section');


board.setAttribute('class', 'board');
game.appendChild(board);


doubleCards.forEach(item => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.parId = item.parId;

   //framsidan
   const front = document.createElement('div');
   front.classList.add('front');

   //baksidan
   const back = document.createElement('div');
   back.classList.add('back');
   back.style.backgroundImage = `url(${item.img})`;

  board.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

function refreshPage(){
    window.location.reload();
}

// funktion för matchade element för att matcha css
const match = () => {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

const reset = () => {
  firstCard = '';
  secondCard = '';
  count = 0;
  previousEvent = null;
  tries++;
  if (tries % 6 == 0) {
    var star = document.getElementById('star');
    star.parentNode.removeChild(star);
  }
    if ( tries > 17 && matchedCards.length < 12){
      document.getElementById("result").innerHTML = "You lost";
          }

  document.getElementById('tries').innerHTML = tries;

  console.log(matchedCards.length);
  if(matchedCards.length >= 12) {
    document.getElementById('result').innerHTML = "You won! Your score: " + yourScore + "points";
  }


  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');

  });
};

// lägger till lyssnare på hela boarden
board.addEventListener('click', function(event) {

  const clicked = event.target;

  if (clicked.nodeName === 'SECTION' ||
      clicked === previousEvent||
      clicked.parentNode.classList.contains('selected')||
      clicked.parentNode.classList.contains('match'))
    {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      // Assign first guess
      firstCard = clicked.parentNode.dataset.parId;
      //console.log(firstCard);
      clicked.parentNode.classList.add('selected');
    } else {
      // Assign second guess
      secondCard = clicked.parentNode.dataset.parId;
    //  console.log(secondCard);
      clicked.parentNode.classList.add('selected');
      yourScore = yourScore-1;
    }
    // If both guesses are not empty...
    if (firstCard && secondCard) {
      // and the first guess matches the second match...
      if (firstCard === secondCard) {
        // run the match function
        setTimeout(match,delay);
        setTimeout(reset,delay);
        matched++;
        document.getElementById('matched').innerHTML = matched;

      } else {
        setTimeout(reset, delay);
      }

    }
    previousEvent = clicked;

  }



});
