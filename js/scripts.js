function init() {
    document.getElementById('gameContainer').setAttribute('style', 'visibility: hidden;');
    document.getElementById('startGameButton').addEventListener('click', startGame);

    document.getElementById('nextWordButton').addEventListener('click', nextWord);
    document.getElementById('skipWordButton').addEventListener('click', skipWord);
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

function nextWord() {
    incrementRoundScores();
    setWord(getRandomWord());
}

function skipWord() {
    decrementRoundScores();
    setWord(getRandomWord());
}

function incrementRoundScores() {
    let scoresValueElement = document.getElementById('scoresValue');
    let scoresValue = parseInt(scoresValueElement.textContent);

    scoresValueElement.textContent = ++scoresValue;
}

function decrementRoundScores() {
    let scoresValueElement = document.getElementById('scoresValue');
    let scoresValue = parseInt(scoresValueElement.textContent);

    scoresValueElement.textContent = --scoresValue;
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
