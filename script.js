const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let points = 0;
let moves = 0;


function flipCard() {
  if(lockBoard) return; //om kortet är låst, avbryt
  if( this === firstCard) return; // om kortet vi klickar på är samma som första kortet, avbryt

  this.classList.add("flip"); // lägger till klassnamn, gör så att css:en utförst

if(!hasFlippedCard){
//first click
  hasFlippedCard = true;
  firstCard = this; // firstCard = första klicket
  return;
}
// second click = secondcard
  secondCard = this;

  chechForMatch();
}


// matchar dom?
function chechForMatch() { //matchar kortens data?
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
// om dom inte matchar vänder vi tillbaka korten och ökar moves med 1
  isMatch ? disableCards() : unflipCards();
  moves++;
  console.log(moves);
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);  // tarbort lyssnaren från kortet vid klick och triggar funktionen flipCard
  secondCard.removeEventListener("click", flipCard);
  points++; // ger poäng för matchning
  console.log(points);
  if(points==6){
    alert("du vann");
  }

  resetBoard();
}

function unflipCards() { // tar bort klassen flip för att få bort css:en
  lockBoard=true; // när detta görs låser vi hela spelet
  setTimeout(() => { //sätter en fördröjning för syns skull
  firstCard.classList.remove("flip"); // vänder tillbaka korten
  secondCard.classList.remove("flip");

  resetBoard (); // nollstället brädan
}, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false]; // ställer om korten så att dom får lyssnare  igen
  [firstCard, secondCard] = [null, null]; // tar bort värdet som vi tidigare gett dom (this)
}

(function shuffle(){ //parentesen gör att detta är det första som körs på sidan, behöver inte anropas
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 12); // går igenom alla kort och ger dom ett slumpat nummer
    card.style.order = randomPosition;
  });
})();
cards.forEach(card => card.addEventListener("click", flipCard)); // lägger till en lyssnare på alla kort
