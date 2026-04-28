// TODO minigame
//VG level left

//API-CONSTANTS
const POST_URL = "https://hooks.zapier.com/hooks/catch/8338993/ujs9jj9/";
const GET_URL = "https://script.google.com/macros/s/AKfycbys5aEPMvNCutyhNYYCcQcCjzsi2UtqNspmKyCH-AicJxJbCJMrAoT0LUaYaXhTWA8n/exec";

//TIME CONSTANT
//isolated so that I can easily shorten during tests
const START_TIME = 60;

//STARTING VARIABLES
let score = 0;
let timeLeft = START_TIME;
let gameStarted = false;
let gameEnded = false;
let timerInterval = null;
let hasSubmitted = false;

//DOM-ELEMENT
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');
const clickBtn = document.getElementById('click-button');
const nameInput = document.getElementById('name-input');
const againBtn = document.getElementById('again-button');
const submitBtn = document.getElementById('submit-button');

//GAME LOGIC & UI
//at game start, validate name (logic in separate file)
const startGame = () => {
    const rawName = nameInput.value.trim();

    if (!isNameValid(rawName)) {
        alert("Oops! Your player name must be 2-16 characters and can contain only letters a-z, numbers and underscore.");
        return;
        }

    //count first click for points as well
    gameStarted = true;
    gameEndeded = false;
    nameInput.value = rawName.toLowerCase();

//empty input field during game (so name can't be changed partway) + lock submit button
    nameInput.disabled = true;
    submitBtn.disabled = true;

//time counter
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
};

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

//ends game and enables buttons
const endGame = () => {
    gameEnded = true;
    clearInterval(timerInterval);

    nameInput.disabled = false;
    submitBtn.disabled = false;

    alert("Game finished! Your result: " + score);
};

//RESET GAME
againBtn.addEventListener('click', () => {
    score = 0;
    timeLeft = START_TIME;
    gameStarted = false;
    gameEnded = false;
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit score";
    hasSubmitted = false;

    scoreDisplay.innerText = score;
    timerDisplay.innerText = timeLeft;

    nameInput.disabled = false;
    submitBtn.disabled = false;
});

//SUBMIT HIGH SCORE
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
        })

        //error code, does not lock button
        .catch((error) => {
            console.error("There was a problem when attempting to submit:", error);
        });
};

submitBtn.addEventListener('click', () => {
    submitHighScore();
});