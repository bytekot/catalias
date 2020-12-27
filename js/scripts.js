function init() {
    document.getElementById('gameContainer').setAttribute('style', 'visibility: hidden;');
    document.getElementById('startGameButton').addEventListener('click', startGame);

    document.getElementById('nextWordButton').addEventListener('click', startRound);
}

function startGame() {
    document.getElementById('settingsContainer').setAttribute('style', 'visibility: hidden;');
    document.getElementById('gameContainer').setAttribute('style', 'visibility: visible;');

    startRound();
}

function startRound() {
    setWord(getRandomWord());
    startTimer(60, 0);
}

function setWord(word) {
    document.getElementById('word').textContent = word;
}

function startTimer(start = 10, end = 0) {
    document.getElementById('timer').textContent = start;

    setTimeout(value => {
        value--;

        if (value >= end) {
            startTimer(value);
        }
    }, 1000, start);
}

document.addEventListener("DOMContentLoaded", init);
