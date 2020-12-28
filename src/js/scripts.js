import { getRandomWord } from './words.js';

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
    addToRoundScore(1);
    setWord(getRandomWord());
}

function skipWord() {
    addToRoundScore(-1);
    setWord(getRandomWord());
}

/**
 * Add poits to the round score.
 * @param {number} points - Points to add
 * @returns updated round scores
 */
function addToRoundScore(points) {
    let scoreElement = document.getElementById('score');
    let newScore = parseInt(scoreElement.textContent) + points;

    scoreElement.textContent = newScore;

    return newScore;
}

function startTimer(start = 60, end = 0) {
    document.getElementById('timer').textContent = start;

    setTimeout(value => {
        value--;

        if (value >= end) {
            startTimer(value);
        }
    }, 1000, start);
}

document.addEventListener("DOMContentLoaded", init);
