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

        self.game = new Game(
            document.getElementById('team1-namefield').getAttribute('value'),
            document.getElementById('team2-namefield').getAttribute('value'),
            {
                roundDuration: 10,
                scoreToWin: 10,
                onRoundEnd: self.onRoundEnd.bind(self)
            }
        );

        document.getElementById('game-team1-name').textContent = document.getElementById('team1-namefield').getAttribute('value');
        document.getElementById('game-team2-name').textContent = document.getElementById('team2-namefield').getAttribute('value');
        
        document.getElementById('settingsContainer').setAttribute('style', 'display: none;');
        document.getElementById('gameContainer').setAttribute('style', 'display: block;');
    }

    startRound() {
        document.getElementById('gameContainer').setAttribute('style', 'display: none;');
        document.getElementById('roundContainer').setAttribute('style', 'display: block;');
    
        this.game.startRound();
    }

    onRoundEnd() {
        document.getElementById('gameContainer').setAttribute('style', 'display: block;');
        document.getElementById('roundContainer').setAttribute('style', 'display: none;');
    }

    nextWord() {
        this.game.currentRound.nextWord();
    }

    skipWord() {
        this.game.currentRound.skipWord();
    }
}
