import { Game } from './game.js';

export class Catalias {
    init() {
        let self = this;

        document.getElementById('gameContainer').setAttribute('style', 'display: none;');
        document.getElementById('roundContainer').setAttribute('style', 'display: none;');

        document.getElementById('startGameButton').addEventListener('click', self.startGame.bind(self), false);
        document.getElementById('startRoundButton').addEventListener('click', self.startRound.bind(self), false);
        document.getElementById('nextWordButton').addEventListener('click', self.nextWord.bind(self), false);
        document.getElementById('skipWordButton').addEventListener('click', self.skipWord.bind(self), false);
    }

    startGame() {
        let self = this;
        let team1Name = document.getElementById('team1-namefield').getAttribute('value');
        let team2Name = document.getElementById('team2-namefield').getAttribute('value');
        let scoreToWin = 10;

        self.game = new Game(
            team1Name,
            team2Name,
            {
                roundDuration: 10,
                scoreToWin: scoreToWin
            }
        );

        document.getElementById('game-team1-name').textContent = team1Name;
        document.getElementById('game-team2-name').textContent = team2Name;
        document.getElementById('game-current-team-name').textContent = team1Name;
        document.getElementById('game-score-to-win').textContent = scoreToWin;
        document.getElementById('settingsContainer').setAttribute('style', 'display: none;');
        document.getElementById('gameContainer').setAttribute('style', 'display: block;');
    }

    startRound() {
        document.getElementById('gameContainer').setAttribute('style', 'display: none;');
        document.getElementById('roundContainer').setAttribute('style', 'display: block;');
    
        this.game.startRound();
    }

    nextWord() {
        this.game.currentRound.nextWord();
    }

    skipWord() {
        this.game.currentRound.skipWord();
    }
}
