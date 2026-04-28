# The Great Clicking Game

## Done for G-level
1. Variables: Created score, timeLeft, isGameActive, and API-URL (const).
2. DOM References: Linked variables to HTML elements (button, score text, timer).
3. Start Logic: Function to set `isGameActive = true` and reset the score.
4. Scoring Logic: Function that increases score on click, but ONLY if `isGameActive` is true.
5. Timer Logic: Used `setInterval` for the countdown. Stops at 0 and sets `isGameActive = false`.
6. Name Input: Handled name retrieval from the text field (2-16 characters) and validation. 
7. Submit Logic: Used fetch (POST) to send JSON {name, score} to the Zapier URL.
8. Feedback: Displays a message (alert or text) confirming if the score was saved.
9. Bug Fixes: Prevented submission without a name and prevented multiple submissions of the same result.
10. Added CSS to style game

## Done for VG-level:
1. Highscore Container: Created a container to display the top scores.
2. API Integration (GET): Implemented asynchronous data retrieval from Google Apps Script for highscores.
3. Data Cleaning: Created a separate module `(highscore-cleaner.js)` to clean and sort data, ensuring each player appears only once with their best result. Also trunkates excessively long names.
4. Timeout Handling: Made an `AbortController` to stop network requests if they take too long (>8 sec) to prevent the page from hanging. Varying error messages are displayed depending on whether it is first load attempt or failed refresh.

## Documentation Images
The /docs folder contains examples of error messages and game variations:
* `ver1-2_start_load.png` – Shows how the game looks before the highscore list has finished loading.
* `invalid_name.png` – Alert if a player attempts to enter unauthorized name (too long etc).
* `game_breaking_name.png` – Demonstrates what might happen without truncation of  names, now prevented in `highscore-cleaner.js`. Through `validation.js`, stops such names to be submitted from this game.
* `highscore_could_not_be_refreshed.png` – Shows what happens if a loaded highscore list could not be refreshed. Instead of overwriting, a small error message is appended beneath names. 
* `played_game_reset.png` - user Supertrooper has played the game and entered highscore list with 344 clicks. Due to time it takes for Zapier/Gdocs to update, it was not visible immediately but when user hit Play again! after a few seconds, the highscore list updated 