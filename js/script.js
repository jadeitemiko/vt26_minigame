/*CONTENT
1. Constants & Variables
2. DOM-elements
3. Assist functions
4. Game logic & submit functions
5. Event listeners
 */

//1. API & TIME-CONSTANTS
const POST_URL = "https://hooks.zapier.com/hooks/catch/8338993/ujs9jj9/";
const GET_URL = "https://script.google.com/macros/s/AKfycbys5aEPMvNCutyhNYYCcQcCjzsi2UtqNspmKyCH-AicJxJbCJMrAoT0LUaYaXhTWA8n/exec";

const START_TIME = 60; //isolated time to shorten during testruns

//starting variables
let score = 0;
let timeLeft = START_TIME;
let gameStarted = false;
let gameEnded = false;
let timerInterval = null;
let hasSubmitted = false;

//2. DOM-ELEMENTS
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');
const clickBtn = document.getElementById('click-button');
const nameInput = document.getElementById('name-input');
const againBtn = document.getElementById('again-button');
const submitBtn = document.getElementById('submit-button');
timerDisplay.innerText = timeLeft; //UI: connects js-time to html-time

//3. ASSIST FUNCTIONS

//replace 'Load highscores...' with current scores
const updateScoreboard = () => {
    fetchAndDisplayScores(GET_URL, 'highscore-list'); //calls highscore-cleaner.js
};

//validate name (logic in separate file)
const startGame = () => {
    const rawName = nameInput.value.trim();

    if (!isNameValid(rawName)) {
        alert("Oops! Your player name must be 2-16 characters and can contain only letters a-z, numbers and underscore.");
        return;
    }

    gameStarted = true; //count first click for points as well
    gameEnded = false;
    nameInput.value = rawName.toLowerCase();
    nameInput.disabled = true; //empty input field during game (so name can't be changed partway)
    submitBtn.disabled = true; //lock submit button

//time counter
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
};
//ends game and enables buttons
const endGame = () => {
    gameEnded = true;
    clearInterval(timerInterval);

    nameInput.disabled = true;
    submitBtn.disabled = false;

    alert("Game finished! Your result: " + score);
};

//sends result to class scoreboard
const submitHighScore = () => {
    //not allowed to send same result twice
    if (hasSubmitted) {
        alert("You have already sent this score. Play again and you can submit your new result!");
        return; //
    }

//send data with fetch
    fetch(POST_URL, {
        method: 'POST',
        body: JSON.stringify({
            name: nameInput.value,
            score: score
        })
    })
        .then(() => {
            hasSubmitted = true; //locks button when submit works
            alert("Your score has been submitted!");
            nameInput.disabled = false; //opens name field again
            updateScoreboard();
        })

        //error code, does not lock button
        .catch((error) => {
            console.error("There was a problem when attempting to submit:", error);
        });
};


//5. EVENT LISTENERS
//start the game + control that can't keep clicking after time has run out
clickBtn.addEventListener('click', () => {
    if (!gameStarted && !gameEnded) {
        startGame();
    }
//score counter
    if (gameStarted && !gameEnded) {
        score++;
        scoreDisplay.innerText = score;
    }
});

//reset game
againBtn.addEventListener('click', () => {
    score = 0;
    timeLeft = START_TIME;
    timerDisplay.innerText = timeLeft;
    gameStarted = false;
    gameEnded = false;
    hasSubmitted = false;
    nameInput.disabled = false;
    submitBtn.disabled = true;
    scoreDisplay.innerText = score; //Updates scoring
    updateScoreboard();
});

submitBtn.addEventListener('click', () => {
    submitHighScore();
});