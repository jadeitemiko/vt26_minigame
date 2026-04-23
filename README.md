The Great Clicking Game

Genomfört för G-nivå
1. Variabler: Skapat score, timeLeft, isGameActive och API-URL (const).
2. DOM-referenser: Kopplat variabler till HTML-element (knapp, poängtext, timer).
3. Start-logik: Funktion för att sätta isGameActive = true och nollställa score.
4. Poäng-logik: Funktion som ökar score vid klick, men BARA om isGameActive är true.
5. Timer-logik: Använt setInterval för att räkna ner. Stoppa vid 0 och sätt isGameActive = false.
6. Namn-input: Hanterat hämtning av namn från textfältet (2-16 tecken) och validera
7. Submit-logik: Använd fetch (POST) för att skicka JSON {name, score} till Zapier-URL.
8. Feedback: Visa ett meddelande (alert eller text) om poängen sparades.
9. Buggfixar: Kan ej skicka in utan namn, kan ej skicka in samma resultat flera gånger