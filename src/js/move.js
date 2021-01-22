import { Base } from './base.js';

export class Move extends Base {
    constructor(team, duration, words, onMoveEnd) {
        super();

        this.elementId = 'move-container';
        this.team = team;
        this.duration = duration;
        this.words = words;
        this.onMoveEnd = onMoveEnd;
        this.teamScore = team.score;
        this.score = 0;
        this.template = [
            `<div id="${this.elementId}">`,
                '<div class="progress-bar" >',
                    '<span class="bar">',
                        '<span class="progress"></span>',
                    '</span>',
                '</div>',
                '<div id="move-timer"></div>',
                '<div id="move-score-container">',
                    '<label>Очки: </label>',
                    `<span id="move-score">${this.teamScore}</span>`,
                '</div>',
                '<div class="move-card-container">',
                    '<div class="card">',
                        '<span id="move-word"></span>',
                    '</div>',
                    '<div class="card"></div>',
                    '<div class="card"></div>',
                '</div>',

                '<div id="move-buttons-container">',
                    '<button id="move-button-skip">Пропустить слово</button>',
                    '<button id="move-button-next">Следующее слово</button>',
                '</div>',
            '</div >',
        ];
    }

    /**
     * Renders the move view.
     * Inits handlers of move buttons.
     * Sets the first word, starts the timer.
     */
    start() {
        this.render();
        this.addListener('move-button-skip', 'click', 'skipWord');
        this.addListener('move-button-next', 'click', 'nextWord');
        this.changeWord();
        this.startTimer(this.duration);
    }

    /**
     * Removes the move view.
     * Calls the appropriate game handler.
     */
    end() {
        this.destroy();
        this.onMoveEnd(this.score);
    }

    /**
     * Sets another current word selected randomly. Updates the view.
     */
    changeWord() {
        let word = this.getRandomWord();

        this.currentWord = word;
        this.setText('move-word', word);
    }

    /**
     * The "Next" button handler:
     *   - increments the score;
     *   - prevents the current word from repeating;
     *   - changes the word.
     */
    nextWord() {
        this.addPoints(1);
        this.words.splice(this.words.indexOf(this.currentWord), 1);
        this.changeWord();
    }

    /**
     * The "Skip" button handler: decrements the score, changes the word.
     */
    skipWord() {
        this.addPoints(-1);
        this.changeWord();
    }

    /**
     * Returns a random word from the game word list.
     *
     * @returns {string}
     */
    getRandomWord() {
        return this.words[Math.floor(Math.random() * this.words.length)];
    }  

    /**
     * Adds points to the move score; updates the total score view.
     *
     * @param {number} value - Points to add
     */
    addPoints(value) {
        this.score = this.score + value;
        this.setText('move-score', this.teamScore + this.score);
    }

    /**
     * Starts the move countdown. Updates the view.
     *
     * @param {number} start - Reference position
     */
    startTimer(start = 60) {
        this.setText('move-timer', start);

        setTimeout(value => {
            value--;

            if (value >= 0) {
                this.startTimer(value);
            } else {
                this.end();
            }
        }, 1000, start);
    }
}

// https://www.typescriptlang.org/play?#code/MYGwhgzhAEDiYFsCm0DeAoaXoAcCuARiAJbDQBOSYAJgPYB2IAntAC5UIQBcFVdjLACocA2gF0A3Jmz4ipXjQbNo1Uq2IMw5JjwAiajfS1Mp0rMAYRW5PMFa1yACnaJu0YYnEAaFQc3a9PyNtAEo0aDNsLFYAC2IIADoXTmgAXjYOCCkoqNj4hNU7Q2M03yL-E0iAX3RI2RIyAHMkVgBhPHJKelYPBEcwjBzsSlYO+mg8emokADNieiRqbOwausIGtlIAa360SKiRsYmp2fnF5awa1dBIGF69qPr5SkUBaCNkHityecbTKIs9G+tnsTg+SC+1l+A322DyiXBpXBF2gV1qNyg0AASrRJtQ9uhruBMQBZWgANxQgxkP3JYHYCn4ygQFKQgmIyAA7iTiCASBAkIDqG56HgEAQkOQUThafSUPNiOowCAeXz4oKGMKeKLxZLoAAfY7TOYLJZ1WUM4AdLqsVX8jVTEViiXkA1G06m-7YQHAuwORwsyns5B29VCp268gwobROKJQNsjlIbm8+3h0oJ4NIUMC8Mo1ZRKxaViOBVKlWpsOaiMu6Mx+EJMvEZU5h3C0pNluV3PV-O1XLbRxWzpIbqt8Pa52SutDBvDm3j6uleej23dttZar97DxABiCogMUWu2pQ2IM2gzjjjfoiubFbVPcd0AAZC+2NeV2P1+GZzGsIc5DjHO1qrouz4ALQfvknYPmmS4AHzQfGrJZimj4biiUQFjGgHjDMyoCn2RK3NA+jlMELCnrg6zPHwSgsJyDhaoyDHQN8vziF65iWNYIL+kx5AsRx9CNOIf65Negntuk0mbthhK1OgPqsBkiAAIxIsm7gcI4ADk9zqXpIRSCpakIAATFpnI6Yg+n3BZxmmGZhTqBU1lkUExiOCIenSUZPh+cxjmBdJADMeliCZSlmY0iAoOkCw2fAyA+ck6k+MkFliD4rnFKEzm8dACYeWSlKOOpAAM1XRegCYJEW5AlrocoJPQtCcv0tUCj0Sa4iWuypEhqARFE9XqMAOwtewbUdV1KI+rQIBIAkIC0I0Aaso2ED7reh7HiE0VVD4ACsNWmAA9Bd0BxcgSSZKUXHoFdN3xfdrgJPgh6OEltl9AZHDQBFh1SC96VtfFpR6bQtA4BAekSEAA