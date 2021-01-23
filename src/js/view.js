import { Dictionary, Team, Game, Move } from './core.js';

class View {
    onRender() {
        this.addListener('button-start-game', 'click', 'onStartGameButtonClick');
        this.addListener('button-start-move', 'click', 'onStartMoveButtonClick');
        this.addListener('button-move-skip-word', 'click', 'onSkipWordButtonClick');
        this.addListener('button-move-next-word', 'click', 'onNextWordButtonClick');
        this.addListener('button-new-game', 'click', 'onNewGameButtonClick');
    }

    addListener(elementId, eventName, listener) {
        document.getElementById(elementId).addEventListener(eventName, this[listener].bind(this), false);
    }

    setText(elementId, text) {
        document.getElementById(elementId).textContent = text;
    }

    addClass(elementId, className) {
        document.getElementById(elementId).classList.add(className);
    }

    removeClass(elementId, className) {
        document.getElementById(elementId).classList.remove(className);
    }

    getFieldValue(elementId) {
        return document.getElementById(elementId).getAttribute('value');
    }

    getSettings() {
        return {
            teams: [
                new Team(this.getTeamName(1)),
                new Team(this.getTeamName(2))
            ],
            dictionary: new Dictionary(),
            options: {
                moveDuration: 10,
                scoreToWin: 10
            }
        };
    }

    getTeamName(teamIndex) {
        return this.getFieldValue(`team${teamIndex}-namefield`);
    }

    onStartGameButtonClick() {
        const settings = this.getSettings();

        this.game = new Game(settings.teams, settings.dictionary, settings.options);

        this.setText('game-team1-name', settings.teams[0].name);
        this.setText('game-team2-name', settings.teams[1].name);
        this.setText('game-score-to-win', settings.options.scoreToWin);
        this.setText('current-team-name', this.game.getCurrentTeam().name);

        this.addClass('settings-container', 'hidden');
        this.removeClass('game-container', 'hidden');
    }

    onStartMoveButtonClick() {
        this.moveDuration = this.game.moveDuration;
        this.currentWord = this.game.dictionary.getRandomWord();
        this.moveScore = 0; // in view ?

        this.setText('move-score', this.moveScore);
        this.setText('current-word', this.currentWord);
        this.setText('move-timer', this.moveDuration);

        this.addClass('game-container', 'hidden');
        this.removeClass('move-container', 'hidden');

        const move = new Move(this.moveDuration * 1000);

        move.start(Date.now());

        const intervalId = setInterval(() => {
            move.tick(Date.now());

            if (move.isFinished()) {
                clearInterval(intervalId);
                this.onMoveEnd();
            }

            this.setText('move-timer', --this.moveDuration);
        }, 1000);
    }

    onNextWordButtonClick() {
        this.moveScore++;
        this.currentWord = this.game.dictionary.getRandomWord();

        this.setText('current-word', this.currentWord);
        this.setText('move-score', this.moveScore);
    }

    onSkipWordButtonClick() {
        this.currentWord = this.game.dictionary.getRandomWord();

        this.setText('current-word', this.currentWord);
        this.setText('move-score', this.moveScore);
    }

    onNewGameButtonClick() {
        this.addClass('game-container', 'hidden');
        this.removeClass('settings-container', 'hidden');
    }

    onMoveEnd() {
        const game = this.game;
        const currentTeam = game.getCurrentTeam();

        currentTeam.tickMove(this.moveScore);

        this.moveScore = 0;

        this.setText(`game-team${game.teams.indexOf(currentTeam)}-score`, currentTeam.score);
        this.setText('current-team-name', game.getCurrentTeam().name);

        this.addClass('move-container', 'hidden');
        this.removeClass('game-container', 'hidden');

        if (game.isFinished()) {
            //this.setText('game-status', 'Победа');
            this.addClass('button-start-move', 'hidden');
            this.removeClass('button-new-game', 'hidden');
        }
    }
}

document.addEventListener("DOMContentLoaded", () => new View().onRender());
