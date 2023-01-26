'use strict';

// Selecting Elemets
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');
let diceEl = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores, currentScore, activePlayer, playing;
let init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  // Switch player back to first
  activePlayer = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  // Reset current score
  currentScore = 0;
  current0El.textContent = 0;
  current0El.textContent = 0;
  // Reset score
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  // Hide dice
  diceEl.classList.add('hidden');
  // Hide player--winner screen
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
};

init();

let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating radom dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1: if True , switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } // Switch to next player
    else {
      switchPlayer();
    }
  }
});

// Button HOLD PRESS

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current Score to Active Player Score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player score is >=100
    if (scores[activePlayer] >= 100) {
      //Finish GAME
      playing = false;
      diceEl.classList.toggle('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //3. Switch to next player if score in <100
    switchPlayer();
  }
});

// Button New GAME
btnNew.addEventListener('click', init);
