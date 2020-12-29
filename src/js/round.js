export class Round {
    constructor(team, duration, words, onRoundEnd) {
        let self = this;

        self.team = team;
        self.duration = duration;
        self.words = words;
        self.onRoundEnd = onRoundEnd;
        self.teamScore = team.score;
        self.score = 0;
    }

    start() {
        let self = this;

        document.getElementById('score').textContent = self.teamScore;
        self.changeWord();
        self.startTimer(self.duration, 0);
    }

    end() {
        this.onRoundEnd(this.score);
    }

    changeWord() {
        let word = this.getRandomWord();

        this.currentWord = word;
        document.getElementById('word').textContent = word;
    }

    nextWord() {
        let self = this;

        self.addToRoundScore(1);
        self.words.splice(self.words.indexOf(self.currentWord), 1);
        self.changeWord();
    }

    skipWord() {
        let self = this;

        self.addToRoundScore(-1);
        self.changeWord();
    }

    /**
     * Returns a random word from game word list.
     * @returns {string} word
     */
    getRandomWord() {
        return this.words[Math.floor(Math.random() * this.words.length)];
    }  

    // TODO
    /**
     * Add poits to the round score.
     * @param {number} points - Points to add
     * @returns {number} updated round scores
     */
    addToRoundScore(points) {
        let self = this;
        self.score = self.score + points;

        let totalScore = self.teamScore + self.score;
        document.getElementById('score').textContent = totalScore;

        return totalScore;
    }

    /**
     * Starts round countdown.
     * @param {number} start 
     * @param {number} end 
     */
    startTimer(start = 60, end = 0) {
        document.getElementById('timer').textContent = start;

        setTimeout(value => {
            value--;

            if (value >= end) {
                this.startTimer(value);
            } else {
                this.end();
            }
        }, 1000, start);
    }
}
