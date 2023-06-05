const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
let time = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");

    startGame(16);
  }
});

function decreaseTime() {
  if (time === 0) {
    finishGame();
    return
  } else {
    let current = --time;
    setTime(current);
  }
}

function setTime(value) {
  let minutes = Math.floor(value / 60);
  let seconds = value % 60;
  timeEl.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  if (value === 0) {
    board.append(overlay);
    finishGame();
    restartGame();
  }
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");

  clearInterval(time)
}

function restartGame () {
  let restart = document.createElement("button");
  restart.classList.add("restart");
  restart.innerHTML = "Начать заново";

  board.append(restart);

  restart.addEventListener("click", () => {
    location.reload();
  });
}

function createNumbersArray(count) {
  let cardsNubmerArray = [];

  for (let i = 1; i <= count; i++) {
    cardsNubmerArray.push(i);
    cardsNubmerArray.push(i);
  }

  return cardsNubmerArray;
}

function shuffle(arr) {
  let m = arr.length,
    t,
    i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }

  return arr;
}

function startGame(count) {
  let cardsNumber = shuffle(createNumbersArray(count / 2));
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let matchedCards = 0;

  function createCards() {
    let memoryCards = document.createElement("div");
    let cards = document.createElement("div");
    let cardsBack = document.createElement("div");
    cards.classList.add("front-face");
    cardsBack.classList.add("back-face");
    memoryCards.classList.add("memory-cards");
    cards.textContent = cardsNumber[i];
    cardsBack.dataset.number = cardsNumber[i];

    board.append(memoryCards);
    memoryCards.append(cards);
    memoryCards.append(cardsBack);

    cardsBack.addEventListener("click", open);
  }

  for (i = 0; i < count; i++) {
    createCards();
  }

  function open() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add("open");

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;

    checkForMatch();
  }

  function checkForMatch() {
    if (firstCard.dataset.number === secondCard.dataset.number) {
      disableCards();
      matchedCards += 1;
      if (matchedCards === count / 2) {
        finishGame();
        restartGame()
      }
    } else {
      unflipCards();
    }

    if (document.querySelectorAll(".memory-cards:not(.match)").length === 0) {
      finishGame();
      restartGame()
    }
  }

  function disableCards() {
    firstCard.removeEventListener("click", open);
    secondCard.removeEventListener("click", open);

    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("open");
      secondCard.classList.remove("open");

      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  clearInterval(time);
  setInterval(decreaseTime, 1000);
  setTime(time);
}
