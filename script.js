
var deck = createDeck();
//shuffle(deck);

function createDeck(){

  var img = ["css1.jpg", "css2.jpg", "html1.jpg", "html2.jpg", "js1.jpg", "js2.jpg"];
  var deck = [];

  for (let s = 0; s < 6; s++){
    for (let r = 0; r < 2; r++){
      let card = {
        img: img[s],
        parId: s
      };
      deck.push(card);
      var game = document.getElementById("memory-game");

      var parent = document.createElement("div");
      parent.setAttribute("class", "memory-card");
      game.appendChild(parent);

      var oImg = document.createElement("img");
      oImg.setAttribute('src', img[s]);
      parent.appendChild(oImg);

    }
  }
}


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
  let isMatch = firstCard.src === secondCard.src;
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

  firstCard.style.visibility ="hidden";
  secondCard.style.visibility ="hidden";

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
//
// (function shuffle(){ //parentesen gör att detta är det första som körs på sidan, behöver inte anropas
//   cards.forEach(card => {
//     let randomPosition = Math.floor(Math.random() * 12); // går igenom alla kort och ger dom ett slumpat nummer
//     card.style.order = randomPosition;
//   });
// })();
// cards.forEach(card => card.addEventListener("click", flipCard)); // lägger till en lyssnare på alla kort
//
// function shuffle(a) {
//     for (let i = a.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (11  + 1));
//         [a[i], a[j]] = [a[j], a[i]];
//     }
//       console.log(a);
//     return a;
// }
