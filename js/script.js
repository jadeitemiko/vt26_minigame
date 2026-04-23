// TODO minispelet
// 1. Variabler: Skapa score, timeLeft, isGameActive och API-URL (const).
// 2. DOM-referenser: Koppla variabler till HTML-element (knapp, poängtext, timer).
// 3. Start-logik: Funktion för att sätta isGameActive = true och nollställa score.
// 4. Poäng-logik: Funktion som ökar score vid klick, men BARA om isGameActive är true.
// 5. Timer-logik: Använd setInterval för att räkna ner. Stoppa vid 0 och sätt isGameActive = false.
// 6. Namn-input: Hantera hämtning av namn från textfältet (3-16 tecken).
// 7. Submit-logik: Använd fetch (POST) för att skicka JSON {name, score} till Zapier-URL.
// 8. Feedback: Visa ett meddelande (alert eller text) om poängen sparades.

//API-KONSTANTER
const POST_URL = "https://hooks.zapier.com/hooks/catch/8338993/ujs9jj9/";
const GET_URL = "https://script.google.com/macros/s/AKfycbys5aEPMvNCutyhNYYCcQcCjzsi2UtqNspmKyCH-AicJxJbCJMrAoT0LUaYaXhTWA8n/exec";

//STARTVARIABLER
let score = 0;
let timeLeft = 10;
let gameStarted = false;
let gameEnded = false;
let timerInterval = null;

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
        alert("Oops! Your player name must be 2-16 characters and can contain only letters a-z and numbers.");
        return;
        }

    //räkna även första klicket för poäng
    gameStarted = true;
    gameEnded = false;
    nameInput.value = rawName.toLowerCase(); //gör om namnet till små bokstäver

//rensa input-fälten under spel
    nameInput.style.visibility = 'hidden';
    submitBtn.style.visibility = 'hidden';

//tidsräknaren
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
};

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

    nameInput.style.visibility = 'visible';
    submitBtn.style.visibility = 'visible';

    alert("Game finished! Your result: " + score);
};

//NOLLSTÄLL Om spelaren vill köra en till omgång
againBtn.addEventListener('click', () => {
    score = 0;
    timeLeft = 60;
    gameStarted = false;
    gameEnded = false;

    scoreDisplay.innerText = score;
    timerDisplay.innerText = timeLeft;

    nameInput.style.visibility = 'visible';
    submitBtn.style.visibility = 'visible';
});

//HIGH SCORE-LISTA
const submitHighScore = () => {
    const name = nameInput.value;

// Skicka data med fetch
    fetch(POST_URL, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            score: score
        })
    })
        .then(() => {
            alert("Your score has been submitted!");
        })
        .catch((error) => {
            console.error("There was a problem when attempting to submit. Error: ", error);
        });
};

submitBtn.addEventListener('click', () => {
    submitHighScore();
});