import { Game } from './game.js';

export class Catalias {
    constructor() {}

    init() {
        let self = this;

        document.getElementById('gameContainer').setAttribute('style', 'visibility: hidden;');

        document.getElementById('startGameButton').addEventListener('click', self.startGame.bind(self), false);
        document.getElementById('nextWordButton').addEventListener('click', self.nextWord.bind(self), false);
        document.getElementById('skipWordButton').addEventListener('click', self.skipWord.bind(self), false);
    }

    startGame() {
        document.getElementById('settingsContainer').setAttribute('style', 'visibility: hidden;');
        document.getElementById('gameContainer').setAttribute('style', 'visibility: visible;');

        let game = new Game('Command 1', 'Command 2');
        this.game = game;
        this.game.start();
    }

    nextWord() {
        this.game.currentRound.nextWord();
    }

    skipWord() {
        this.game.currentRound.skipWord();
    }
}
