// Card data
const cardsArray = [{
    'name': 'shell',
    'img': 'pics/css1.jpg',
  },
  {
    'name': 'star',
    'img': 'pics/css2.jpg',
  },
  {
    'name': 'bobomb',
    'img': 'pics/Evil_toddler.png',
  },
  {
    'name': 'mario',
    'img': 'pics/html1.jpg',
  },
  {
    'name': 'luigi',
    'img': 'pics/html2.jpg',
  },
  {
    'name': 'peach',
    'img': 'pics/js1.jpg',
  },
  {
    'name': '1up',
    'img': 'pics/js2.jpg',
  },
  {
    'name': 'mushroom',
    'img': 'pics/css1.jpg',
  },
  {
    'name': 'thwomp',
    'img': 'pics/css2.jpg',
  },
  {
    'name': 'bulletbill',
    'img': 'pics/html1.jpg',
  },
  {
    'name': 'coin',
    'img': 'pics/html2.jpg',
  },
  {
    'name': 'goomba',
    'img': 'pics/Evil_toddler.png',
  },
];

// Skapar ett nytt element i index för att ge en spelplan.
  const game = document.getElementById('memory-game');
  const grid = document.createElement('section');
  grid.setAttribute('class', 'grid');
  game.appendChild(grid);

  let previousTarget = null;
  let gameGrid = cardsArray.concat(cardsArray); //Dubblar antalet kort så att man har 2 av varje.

// Loppa igenom listan med kort som ska individualiseras.
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
  });
}
