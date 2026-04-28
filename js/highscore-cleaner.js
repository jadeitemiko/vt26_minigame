//Highscore cleaner
//ensures that we display a visually appealing and fun high score list
//also contains safeguards against lag/slow loading of highscore

/*
1. Sorting and cleaning
2. Error messages and overwrite logic
 */

/*1. SORTING AND CLEANING
Rules: Sorted by max scores, each playername appears only once, truncate too long names
cutoff list at top ten */
const processScores = (data, limit = 10) => {
    const uniqueNames = [];

    data.forEach(item => {
        if (!item || !item.name) { //if score is saved without a name, skip that line
            return;
        }
        const name = String(item.name).toLowerCase().substring(0, 46); //numbers as text, only lowercase, max limit
        const score = Number(item.score) || 0; //ensure that scores are interpreted as numbers and empty scores set to zero
        const existingUser = uniqueNames.find(user => user.name === name);

        //to make list more interesting, each user can only be on toplist once
        if (!existingUser) {
            uniqueNames.push({ name: name, score: score });
        } else if (score > existingUser.score) {
            existingUser.score = score;
        }
    });

    return uniqueNames
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
};

/*
2. ERROR & OVERWRITE
First time we try to get the list, overwrite even if error. If we got a highscore list first time
but fail to reload, we do not overwrite only append with an error message.
 */

const fetchAndDisplayScores = async (url, listElementId) => {
    const listElement = document.getElementById(listElementId);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    //bc highscore results are cleaned to lowercase, we know that a L must be from original message
    const isInitialLoad = listElement.innerHTML.includes("Loading scores...");

    try {
        console.log("HS-CLEANER ATTEMPTS TO FETCH HIGHSCORES...");
        const response = await fetch(url, { signal: controller.signal });
        const data = await response.json();
        clearTimeout(timeoutId);

        listElement.innerHTML = ''; //removes old list content
        const topScores = processScores(data);

        topScores.forEach(item => {
            const li = document.createElement('li');
            li.innerText = `${item.name}: ${item.score}`;
            listElement.appendChild(li);
        });

    } catch (error) {
        if (error.name === 'AbortError') {
            console.warn("HS-cleaner: Fetch timed out.");
        }

        if (isInitialLoad) {
            //First attempt to run list, overwrite with error message:
            listElement.innerHTML = '<li>Connection timed out. Please refresh page to see high score.</li>';
        } else {
            //If a list already exists and new one can't be fetched, don't replace it only add a warning
            if (!listElement.innerHTML.includes("could not be refreshed")) {
                const warning = document.createElement('li');
                warning.style.listStyleType = "none"; //make sure no number
                warning.style.fontSize = "0.75em";
                warning.style.marginTop = "10px";
                warning.style.color = "#888";
                warning.innerText = "⚠ (Highscore could not be refreshed)";

                listElement.appendChild(warning);
            }
        }
    }
};