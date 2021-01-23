import { getWords } from './words.js';

export class Game {
    constructor(teams, dictionary, options) {
        this.teams = teams;
        this.dictionary = dictionary;
        this.moveDuration = options.moveDuration;
        this.scoreToWin = options.scoreToWin;
    }

    getCurrentRound() {
        return this.teams[0].moves;
    }

    getCurrentTeam() {
        const currentRound = this.getCurrentRound();

        let currentTeam;

        for (const team of this.teams) {
            if (team.moves < currentRound) {
                currentTeam = team;

                break;
            }
        }

        return (typeof currentTeam !== 'undefined') ? currentTeam : this.teams[0];
    }

    isFinished() {
        const currentRound = this.getCurrentRound();

        for (const team of this.teams) {
            if (team.moves != currentRound) {
                return false;
            }
        }

        return this.teams.some((team) => {
            return team.score >= this.scoreToWin;
        }) && !this.isAdditionalRoundNeeded();
    }

    isAdditionalRoundNeeded() {
        const highScores = [];

        for (const team of this.teams) {
            if (team.score >= this.scoreToWin) {
                if (highScores.includes(team.score)) {
                    return true;
                }

                highScores.push(team.score);
            }
        }

        return false;
    }
}

export class Team {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.moves = 0;
    }

    tickMove(score) {
        this.moves++;
        this.score = this.score + score;
    }
}

export class Dictionary {
    constructor() {
        this.words = getWords();
    }

    /**
     * Returns a random word and excludes it from the dictionary.
     *
     * @returns {string}
     */
    getRandomWord() {
        const words = this.words;
        const randomWord = words[Math.floor(Math.random() * words.length)];

        words.splice(words.indexOf(randomWord), 1);

        return randomWord;
    }
}

export class Move {
    constructor(moveDurationMilliseconds) {
        this.moveDurationMilliseconds = moveDurationMilliseconds;
    }

    start(initialMilliseconds) {
        this.initialMilliseconds = initialMilliseconds;
    }

    tick(currentMilliseconds) {
        this.currentMilliseconds = currentMilliseconds;
    }

    isFinished() {
        if (this.initialMilliseconds && this.currentMilliseconds) {
            return this.currentMilliseconds - this.initialMilliseconds > this.moveDurationMilliseconds;
        }

        return false;
    }
}
