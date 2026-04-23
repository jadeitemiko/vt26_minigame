// TODO minispelet
// 1. Variabler: Skapa score, timeLeft, isGameActive och API-URL (const).
// 2. DOM-referenser: Koppla variabler till HTML-element (knapp, poängtext, timer).
// 3. Start-logik: Funktion för att sätta isGameActive = true och nollställa score.
// 4. Poäng-logik: Funktion som ökar score vid klick, men BARA om isGameActive är true.
// 5. Timer-logik: Använd setInterval för att räkna ner. Stoppa vid 0 och sätt isGameActive = false.
// 6. Namn-input: Hantera hämtning av namn från textfältet (3-16 tecken).
// 7. Submit-logik: Använd fetch (POST) för att skicka JSON {name, score} till Zapier-URL.
// 8. Feedback: Visa ett meddelande (alert eller text) om poängen sparades.

//API-konstanter
const POST_URL = "https://hooks.zapier.com/hooks/catch/8338993/ujs9jj9/";
const GET_URL = "https://script.google.com/macros/s/AKfycbys5aEPMvNCutyhNYYCcQcCjzsi2UtqNspmKyCH-AicJxJbCJMrAoT0LUaYaXhTWA8n/exec";

//startvariabler
let score = 0;
let timeLeft = 5;
let gameStarted = false;
let gameEnded = false;
let timerInterval = null;

//DOM-element
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');
const clickBtn = document.getElementById('click-button');
const nameInput = document.getElementById('name-input');
const submitBtn = document.getElementById('submit-button');

//spellogik och UI
const startGame = () => {
    gameStarted = true;

    nameInput.style.display = 'none';
    submitBtn.style.display = 'none';

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

    if (gameStarted && !gameEnded) {
        score++;
        scoreDisplay.innerText = score;
    }
});

const endGame = () => {
    gameEnded = true;
    clearInterval(timerInterval);

    nameInput.style.display = 'inline-block';
    submitBtn.style.display = 'inline-block';

    alert("Game finished! Your result: " + score);
};