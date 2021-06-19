'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');


const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');



// starting condition
let  scores;
let currentScore;
let activePlayer;
//  rolling function
let playing;

const init = function () {

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
}

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = "0";
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");

}


btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. generate random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2.  display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`

        // 3.  Check for rolled 1: if true ,switch to next player
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            current0El.textContent = currentScore; //change later

        } else {

            switchPlayer();
        }
    }

});

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score 
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        console.log(scores);
        // 2. Checck if player score is  >= 100
        // finish the game 
        if (scores[activePlayer] >= 20) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--acive');
        } else {
            switchPlayer();
        }

    }
    // wsitch to next player

});


btnNew.addEventListener('click', init);