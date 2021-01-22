import { Base } from './base.js';
import { Move } from './move.js';
import { getWords } from './words.js';

export class Game extends Base {
    constructor(team1Name, team2Name, options) {
        super();

        this.teams = [{
            id: 1,
            name: team1Name,
            score: 0,
            moves: 0
        }, {
            id: 2,
            name: team2Name,
            score: 0,
            moves: 0
        }];
        this.elementId = 'game-container';
        this.currentTeam = this.teams[0];
        this.words = getWords();
        this.moveDuration = options.moveDuration;
        this.scoreToWin = options.scoreToWin;
        this.onGameEnd = options.onGameEnd;
        this.template = [
            `<div id="${this.elementId}">`,
                '<div class="field-container">',
                    `<label id="game-team1-name">${team1Name}</label>: `,
                    '<span id="game-team1-score">0</span>',
                '</div>',
                '<div class="field-container">',
                    `<label id="game-team2-name">${team2Name}</label>: `,
                    '<span id="game-team2-score">0</span>',
                '</div>',
                '<div class="field-container">',
                    '<label>Очки для победы: </label>',
                    `<span id="game-score-to-win">${this.scoreToWin}</span>`,
                '</div>',
                '<div class="title">',
                    '<span id="game-status">Ход</span> команды "',
                        `<span id="game-current-team-name">${team1Name}</span>"`,
                '</div>',

                '<div class="button-container">',
                    '<button id="game-button-start-move">Начать ход</button>',
                    '<button id="game-button-new-game" class="hidden">Новая игра</button>',
                '</div>',
            '</div>',
        ]
    }

    start() {
        this.render();
        this.addListener('game-button-start-move', 'click', 'startMove');
        this.addListener('game-button-new-game', 'click', 'end');
    }

    /**
     * Removes the Game view.
     * Calls the appropriate game handler.
     */
    end() {
        this.destroy();
        this.onGameEnd();
    }

    /**
     * Switches the current team. Updates the view.
     */
    switchTeam() {
        this.currentTeam = this.getNextTeam();
        this.setText('game-current-team-name', this.currentTeam.name);
    }

    /**
     * Returns the next team data.
     * @returns {object}
     */
    getNextTeam() {
        let nextTeamIndex = this.teams.indexOf(this.currentTeam) === 0 ? 1 : 0;

        return this.teams[nextTeamIndex];
    }

    /**
     * Starts a new game move.
     * @returns {Move} The Move class instance
     */
    startMove() {
        let move = new Move(
            this.currentTeam,
            this.moveDuration,
            this.words,
            this.endMove.bind(this)
        );

        this.addClass(this.elementId, 'hidden');
        this.currentMove = move;
        this.currentMove.start();

        return this.currentMove;
    }
    
    endMove(score) {
        let team1 = this.teams[0];
        let team2 = this.teams[1];
        let currentTeam = this.currentTeam;

        currentTeam.moves++;
        currentTeam.score = currentTeam.score + score;

        delete this.currentMove;

        this.setText(`game-team${currentTeam.id}-score`, currentTeam.score);
        this.removeClass(this.elementId, 'hidden');

        if (team1.moves !== team2.moves || (team1.score < this.scoreToWin && team2.score < this.scoreToWin)) {
            this.switchTeam();
            return;
        }

        if (team1.score === team2.score) {
            this.switchTeam();
            this.setText('game-status', 'Дополнительный ход');
    
            return;
        }

        this.setText('game-status', 'Победа');
        this.setText('game-current-team-name', team1.score > team2.score
            ? team1.name
            : team2.name
        );
        this.addClass('game-button-start-move', 'hidden');
        this.removeClass('game-button-new-game', 'hidden');
    }
}
