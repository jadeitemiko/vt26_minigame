// TODO minispelet
//VG nivå kvar

//API-KONSTANTER
const POST_URL = "https://hooks.zapier.com/hooks/catch/8338993/ujs9jj9/";
const GET_URL = "https://script.google.com/macros/s/AKfycbys5aEPMvNCutyhNYYCcQcCjzsi2UtqNspmKyCH-AicJxJbCJMrAoT0LUaYaXhTWA8n/exec";

//TIDSKONSTANT
//isolera för att kunna korta under test
const START_TIME = 60;

//STARTVARIABLER
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

//SPELLOGIK & UI
//vid spelstart, validera namn (logik i separat fil)
const startGame = () => {
    const rawName = nameInput.value.trim();

    if (!isNameValid(rawName)) {
        alert("Oops! Your player name must be 2-16 characters and can contain only letters a-z, numbers and underscore.");
        return;
        }

    //räkna även första klicket för poäng
    gameStarted = true;
    gameEndeded = false;
    nameInput.value = rawName.toLowerCase(); //gör om namnet till små bokstäver

//rensa input-fälten under spel (så man inte ändrar namn) + lås submit-knapp (så man inte skickar halvklart resultat)
    nameInput.disabled = true;
    submitBtn.disabled = true;

//tidsräknaren
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
};

//starta spelet + kontroll man inte fortsätter efter tid
clickBtn.addEventListener('click', () => {
    if (!gameStarted && !gameEnded) {
        startGame();
    }

//poängräknaren
    if (gameStarted && !gameEnded) {
        score++;
        scoreDisplay.innerText = score;
    }
});

//Avslutar spelet
const endGame = () => {
    gameEnded = true;
    clearInterval(timerInterval);

    nameInput.disabled = false;
    submitBtn.disabled = false;

    alert("Game finished! Your result: " + score);
};

//NOLLSTÄLL Om spelaren vill köra en till omgång
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
//skickar resultat till gemensam lista för hela klassen
const submitHighScore = () => {
    //om man försöker skicka samma resultat igen
    if (hasSubmitted) {
        alert("You have already sent this score. Play again and you can submit your new result!");
        return; //
    }

// Skicka data med fetch
    fetch(POST_URL, {
        method: 'POST',
        body: JSON.stringify({
            name: nameInput.value,
            score: score
        })
    })
        .then(() => {
            hasSubmitted = true; // låser knappen så man inte kan skicka 2 ggr
            alert("Your score has been submitted!");
        })

        //fel? låser inte knappen, så man kan försöka igen
        .catch((error) => {
            console.error("There was a problem when attempting to submit:", error);
        });
};

submitBtn.addEventListener('click', () => {
    submitHighScore();
});