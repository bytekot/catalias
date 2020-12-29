import { getRandomWord } from './words.js';
export class Round {
    constructor() {}

    start() {
        this.setWord(getRandomWord());
        this.startTimer(60, 0);
    }

    setWord(word) {
        document.getElementById('word').textContent = word;
    }

    nextWord() {
        this.addToRoundScore(1);
        this.setWord(getRandomWord());
    }

    skipWord() {
        this.addToRoundScore(-1);
        this.setWord(getRandomWord());
    }

    /**
     * Add poits to the round score.
     * @param {number} points - Points to add
     * @returns {number} updated round scores
     */
    addToRoundScore(points) {
        let scoreElement = document.getElementById('score');
        let newScore = parseInt(scoreElement.textContent) + points;

        scoreElement.textContent = newScore;

        return newScore;
    }

    startTimer(start = 60, end = 0) {
        document.getElementById('timer').textContent = start;

        setTimeout(value => {
            value--;

            if (value >= end) {
                this.startTimer(value);
            }
        }, 1000, start);
    }
}
