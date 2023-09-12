'use strict';

//  all functions expressions dor DRY code
const displayMessage = function (message) {
  document.querySelector(`.message`).textContent = message;
};

const displayScore = function (score) {
  document.querySelector(`.score`).textContent = score;
};

const changeBgColor = function (color) {
  document.querySelector(`body`).style.backgroundColor = color;
};

const showSecretNumber = function (staffToShow) {
  document.querySelector(`.number`).textContent = staffToShow;
};

const changeWidthSecretNumber = function (width) {
  document.querySelector(`.number`).style.width = width;
};

const generateSecretNumber = function (maxNumber) {
  return Math.trunc(Math.random() * maxNumber) + 1;
};

//  setting up all the variables
let secretNumber = generateSecretNumber(50);
let score = document.querySelector(`.score`).textContent;
let highScore = 0;

document.querySelector(`.check`).addEventListener(`click`, function () {
  //  get the user's input ad a Number
  const guess = Number(document.querySelector(`.guess`).value);

  //  if no input from user
  if (!guess) {
    displayMessage(`🤷 Not a number...`);
    //  if guess is bigger the 50
  } else if (guess > 50) {
    displayMessage(`🤦‍♀️ guess between 1 and 50`);
    //  if guess is wrong
  } else if (guess !== secretNumber) {
    //  guess is wrong + has points -> can continue
    if (score > 1) {
      displayMessage(
        guess > secretNumber
          ? `❌ Number is too high!`
          : `❌ Number is too low!`
      );
      score--;
      displayScore(score);

      //  guess is wrong + has NOT points -> CAN'T continue
    } else {
      displayMessage(``);
      displayScore(0);
      changeBgColor(`#e71912`);
      changeWidthSecretNumber(`100vw`);
      showSecretNumber(`😣 You lost!`);
    }

    //  if guess is correct ->  Winning
  } else if (guess === secretNumber) {
    displayMessage(`🎉 Congrats! You Won!`);
    changeBgColor(`#60b347`);
    showSecretNumber(`The numer is: ${secretNumber}`);
    changeWidthSecretNumber(`100vw`);
    if (score > highScore) {
      highScore = score;
      document.querySelector(`.highscore`).textContent = highScore;
    }
  }
});

//  handling play again button
document.querySelector(`.again`).addEventListener(`click`, function () {
  changeBgColor(`#222`);
  showSecretNumber(`?`);
  changeWidthSecretNumber(`15rem`);
  displayMessage(`Start guessing...`);
  document.querySelector(`.guess`).value = ``;
  secretNumber = generateSecretNumber(50);
  score = 20;
  displayScore(score);
});
