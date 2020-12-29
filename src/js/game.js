import { Round } from './round.js';
import { getWords } from './words.js';

export class Game {
    constructor(team1Name, team2Name, options) {
        let self = this;

        self.team1 = {
            name: team1Name,
            score: 0
        };
        self.team2 = {
            name: team2Name,
            score: 0
        };

        self.words = getWords();
        self.roundDuration = options.roundDuration;
        self.scoreToWin = options.scoreToWin;
        self.currentTeam = self.team1;
        self.onRoundEnd = options.onRoundEnd;
    }

    startRound() {
        let self = this;
        let round = new Round(
            self.currentTeam,
            self.roundDuration,
            self.words,
            self.onRoundEnd.bind(self)
        );

        self.currentRound = round;
        self.currentRound.start();

        return self.currentRound;
    }
    
    onRoundEnd(score) {
        let self = this;
        let currentTeam = self.currentTeam;

        currentTeam.score = currentTeam.score + score;

        delete self.currentRound;

        self.onRoundEnd(currentTeam.name, currentTeam.score);
    }
}
