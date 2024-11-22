const gameBoard = document.getElementById("game-board");
const attemptsDisplay = document.getElementById("attempts");
const matchedDisplay = document.getElementById("matched");
const livesDisplay = document.getElementById("lives");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restart-btn");

const flipSound = document.getElementById("flip-sound");
const matchSound = document.getElementById("match-sound");

const defaultPairs = ["🐶", "🐱", "🐰", "🦊", "🐻", "🐼", "🐸", "🦁"];
let cards, flippedCards, attempts, matchedPairs, lives, timer, timerInterval;

function createCardElement(value) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = value;
  card.addEventListener("click", handleCardClick);
  return card;
}

function handleCardClick(e) {
  const clickedCard = e.target;

  if (clickedCard.classList.contains("flipped") || flippedCards.length === 2) {
    return;
  }

  flipSound.play();
  clickedCard.textContent = clickedCard.dataset.value;
  clickedCard.classList.add("flipped");
  flippedCards.push(clickedCard);

  if (flippedCards.length === 2) {
    attempts++;
    attemptsDisplay.textContent = attempts;

    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
      flippedCards = [];
      matchedPairs++;
      matchedDisplay.textContent = matchedPairs;
      matchSound.play();

      if (matchedPairs === defaultPairs.length) {
        clearInterval(timerInterval);
        setTimeout(() => alert(`¡Felicidades, ganaste el juego en ${timer} segundos! 🎉`), 300);
      }
    } else {
      lives--;
      livesDisplay.textContent = lives;

      if (lives === 0) {
        clearInterval(timerInterval);
        setTimeout(() => {
          alert("¡Te quedaste sin vidas! 😢 Reiniciando el juego...");
          initializeGame();
        }, 500);
        return;
      }

      setTimeout(() => {
        firstCard.textContent = "";
        secondCard.textContent = "";
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }
  }
}

function initializeGame() {
  gameBoard.innerHTML = "";
  cards = [...defaultPairs, ...defaultPairs].sort(() => Math.random() - 0.5);
  flippedCards = [];
  attempts = 0;
  matchedPairs = 0;
  lives = 10;
  timer = 0;

  attemptsDisplay.textContent = attempts;
  matchedDisplay.textContent = matchedPairs;
  livesDisplay.textContent = lives;
  timerDisplay.textContent = "Tiempo: 0 segundos";

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer++;
    timerDisplay.textContent = `Tiempo: ${timer} segundos`;
  }, 1000);

  cards.forEach((value) => {
    const cardElement = createCardElement(value);
    gameBoard.appendChild(cardElement);
  });
}

restartBtn.addEventListener("click", initializeGame);

initializeGame();
