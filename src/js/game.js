import { Round } from './round.js';
import { getWords } from './words.js';

export class Game {
    constructor(team1Name, team2Name, options) {
        let self = this;

        self.teams = [{
            id: 1,
            name: team1Name,
            score: 0
        }, {
            id: 2,
            name: team2Name,
            score: 0
        }];
        self.currentTeam = self.teams[0];
        self.words = getWords();
        self.roundDuration = options.roundDuration;
        self.scoreToWin = options.scoreToWin;
    }

    switchTeam() {
        let self = this;
        let nextTeamIndex = self.teams.indexOf(self.currentTeam) === 0 ? 1 : 0;

        self.currentTeam = self.teams[nextTeamIndex];
        document.getElementById('game-current-team-name').textContent = self.currentTeam.name;
    }

    startRound() {
        let self = this;
        let round = new Round(
            self.currentTeam,
            self.roundDuration,
            self.words,
            self.endRound.bind(self)
        );

        self.currentRound = round;
        self.currentRound.start();

        return self.currentRound;
    }
    
    endRound(score) {
        let self = this;
        let currentTeam = self.currentTeam;

        currentTeam.score = currentTeam.score + score;

        delete self.currentRound;

        document.getElementById(`game-team${currentTeam.id}-score`).textContent = currentTeam.score;
        document.getElementById('gameContainer').setAttribute('style', 'display: block;');
        document.getElementById('roundContainer').setAttribute('style', 'display: none;');

        if (currentTeam.score >= self.scoreToWin) {
            document.getElementById('startRoundButton').setAttribute('style', 'display: none;');
            document.getElementById('game-status').textContent = 'Победа';

            return;
        }

        self.switchTeam();
    }
}
