import { Round } from './round.js';
import { getWords } from './words.js';

export class Game {
    constructor(team1Name, team2Name, options) {
        let self = this;

        // TODO
        self.teams = [{
            id: 1,
            name: team1Name,
            score: 0,
            rounds: 0
        }, {
            id: 2,
            name: team2Name,
            score: 0,
            rounds: 0
        }];
        self.currentTeam = self.teams[0];
        self.words = getWords();
        self.roundDuration = options.roundDuration;
        self.scoreToWin = options.scoreToWin;
    }

    switchTeam() {
        let self = this;
        self.currentTeam = self.getNextTeam();

        document.getElementById('game-current-team-name').textContent = self.currentTeam.name;
    }

    getNextTeam() {
        let self = this;
        let nextTeamIndex = self.teams.indexOf(self.currentTeam) === 0 ? 1 : 0;

        return self.teams[nextTeamIndex];
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
        let team1 = self.teams[0];
        let team2 = self.teams[1];
        let currentTeam = self.currentTeam;

        currentTeam.rounds++;
        currentTeam.score = currentTeam.score + score;

        delete self.currentRound;

        document.getElementById(`game-team${currentTeam.id}-score`).textContent = currentTeam.score;
        document.getElementById('gameContainer').setAttribute('style', 'display: block;');
        document.getElementById('roundContainer').setAttribute('style', 'display: none;');

        if (team1.rounds !== team2.rounds || (team1.score < self.scoreToWin && team2.score < self.scoreToWin)) {
            self.switchTeam();
            return;
        }

        if (team1.score === team2.score) {
            self.switchTeam();
            document.getElementById('game-status').textContent = 'Дополнительный ход';
            return;
        }

        document.getElementById('game-status').textContent = 'Победа';
        document.getElementById('game-current-team-name').textContent = team1.score > team2.score
            ? team1.name
            : team2.name;
        document.getElementById('startRoundButton').setAttribute('style', 'display: none;');
    }
}
