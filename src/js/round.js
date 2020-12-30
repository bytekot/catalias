export class Round {
    constructor(team, duration, words, onRoundEnd) {
        let self = this;

        self.elementId = 'round-container';
        self.team = team;
        self.duration = duration;
        self.words = words;
        self.onRoundEnd = onRoundEnd;
        self.teamScore = team.score;
        self.score = 0;
        self.template = [
            `<div id="${self.elementId}">`,
                '<div class="progress-bar" >',
                    '<span class="bar">',
                        '<span class="progress"></span>',
                    '</span>',
                '</div>',
                '<div id="round-timer"></div>',
                '<div id="round-score-container">',
                    '<label>Очки: </label>',
                    `<span id="round-score">${self.teamScore}</span>`,
                '</div>',
                '<div class="round-card-container">',
                    '<div class="card">',
                        '<span id="round-word"></span>',
                    '</div>',
                    '<div class="card"></div>',
                    '<div class="card"></div>',
                    '<div class="card"></div>',
                '</div>',

                '<div id="round-buttons-container">',
                    '<button id="round-button-skip">Пропустить слово</button>',
                    '<button id="round-button-next">Следующее слово</button>',
                '</div>',
            '</div >',
        ];
    }

    /**
     * Renders the round view.
     * Inits handlers of round buttons.
     * Sets the first word, starts the timer.
     */
    start() {
        let self = this;

        document.getElementById('appContainer').insertAdjacentHTML('beforeend', self.template.join(''));
        document.getElementById('round-button-skip').addEventListener('click', self.skipWord.bind(self), false);
        document.getElementById('round-button-next').addEventListener('click', self.nextWord.bind(self), false);

        self.changeWord();
        self.startTimer(self.duration);
    }

    /**
     * Removes the round view.
     * Calls the appropriate game handler.
     */
    end() {
        let self = this;
        let element = document.getElementById(self.elementId);

        element.parentNode.removeChild(element);

        self.onRoundEnd(self.score);
    }

    /**
     * Sets another current word selected randomly. Updates the view.
     */
    changeWord() {
        let word = this.getRandomWord();
        this.currentWord = word;

        document.getElementById('round-word').textContent = word;
    }

    /**
     * The "Next" button handler:
     *   - increments the score;
     *   - prevents the current word from repeating;
     *   - changes the word.
     */
    nextWord() {
        let self = this;

        self.addPoints(1);
        self.words.splice(self.words.indexOf(self.currentWord), 1);
        self.changeWord();
    }

    /**
     * The "Skip" button handler: decrements the score, changes the word.
     */
    skipWord() {
        let self = this;

        self.addPoints(-1);
        self.changeWord();
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
     * Adds poits to the round score; updates the total score view.
     *
     * @param {number} value - Points to add
     */
    addPoints(value) {
        let self = this;
        self.score = self.score + value;

        document.getElementById('round-score').textContent = self.teamScore + self.score;
    }

    /**
     * Starts the round countdown. Updates the view.
     *
     * @param {number} start - Reference position
     */
    startTimer(start = 60) {
        document.getElementById('round-timer').textContent = start;

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
