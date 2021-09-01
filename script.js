"use strict";
// Done by Carlos Amaral (2021/08/29)

/* MODAL WINDOW FUNCTIONALITY */
// Starting Conditions (modal window)
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnOpenModal = document.querySelector(".show-modal");
const btnCloseModal = document.querySelector(".close-modal");

// Modal functions
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Open button functionality
btnOpenModal.addEventListener("click", openModal);

// Close button functionality
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal); // When we click outside the modal window

// "Esc" keypress event to close the modal window
document.addEventListener("keydown", function (e) {
  console.log(e.key);

  if (e.key === "Escape") {
    if (!modal.classList.contains("hidden")) {
      closeModal();
    }
  }
});

/* GAME GENERAL CODE */

// Generate a secret number (up to 20)
let SecretNumber = Math.trunc(Math.random() * 20) + 1;
// Starting conditions for score and highscore
let score = 20;
let highScore = 0;

// Function to display a message
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

// Add functionality to the "check" button
document.querySelector(".check").addEventListener("click", function () {
  // Recognize the guess input
  let guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);

  // Some gaming logic
  // If there isn't input
  if (!guess) {
    displayMessage("No content!!");

    // In the case player wins
  } else if (guess === SecretNumber) {
    displayMessage("You won!!");
    // Make the secret number appear in the place of the "?"
    document.querySelector(".number").textContent = SecretNumber;

    // Make the background color of the page become green when player wins
    document.querySelector("body").style.backgroundColor = "#60b347";

    // Highscore
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }

    // When guess is wrong
  } else if (guess !== SecretNumber) {
    // Score needs to be better than one for the game to run
    if (score > 1) {
      displayMessage(guess > SecretNumber ? "Too high" : "Too low");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("Game over!!");
      document.querySelector(".score").textContent = 0;
    }
  }
});

// Add functionality to the "reset" button (reload the game)
document.querySelector(".reset").addEventListener("click", function () {
  score = 20;
  SecretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage("Start guessing...");
  document.querySelector(".number").textContent = "?";
  document.querySelector(".score").textContent = score;
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "white";
});
