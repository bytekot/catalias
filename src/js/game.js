import { Base } from './base.js';
import { Round } from './round.js';
import { getWords } from './words.js';

export class Game extends Base {
    constructor(team1Name, team2Name, options) {
        super();

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
        self.elementId = 'gameContainer';
        self.currentTeam = self.teams[0];
        self.words = getWords();
        self.roundDuration = options.roundDuration;
        self.scoreToWin = options.scoreToWin;
        self.onGameEnd = options.onGameEnd;
        self.template = [
            `<div id="${self.elementId}">`,
                '<div class="field-container">',
                    '<label id="game-team1-name"></label>:',
                    '<span id="game-team1-score">0</span>',
                '</div>',
                '<div class="field-container">',
                   ' <label id="game-team2-name"></label>:',
                    '<span id="game-team2-score">0</span>',
                '</div>',
                '<div class="field-container">',
                    '<label>Очки для победы:</label>',
                    '<span id="game-score-to-win"></span>',
                '</div>',
                '<div class="title">',
                    '<span id="game-status">Ход</span> команды "<span id="game-current-team-name"></span>',
                '</div>',

                '<div class="button-container">',
                    '<button id="startRoundButton">Начать ход</button>',
                    '<button id="game-button-new-game">Новая игра</button>',
                '</div>',
            '</div>',
        ]
    }

    start() {
        let self = this;

        self.render();
        self.addListener('startRoundButton', 'click', 'startRound');
        self.addListener('game-button-new-game', 'click', 'end');
        self.addClass('game-button-new-game', 'hidden');
        self.setText('game-team1-name', self.teams[0].name);
        self.setText('game-team2-name', self.teams[1].name);
        self.setText('game-current-team-name', self.teams[0].name);
        self.setText('game-score-to-win', self.scoreToWin);
    }

    /**
     * Removes the Game view.
     * Calls the appropriate game handler.
     */
    end() {
        let self = this;
        let element = document.getElementById(self.elementId);

        element.parentNode.removeChild(element);

        self.onGameEnd();
    }

    /**
     * Switches the current team. Updates the view.
     */
    switchTeam() {
        let self = this;
        self.currentTeam = self.getNextTeam();

        document.getElementById('game-current-team-name').textContent = self.currentTeam.name;
    }

    /**
     * Returns the next team data.
     * @returns {object}
     */
    getNextTeam() {
        let self = this;
        let nextTeamIndex = self.teams.indexOf(self.currentTeam) === 0 ? 1 : 0;

        return self.teams[nextTeamIndex];
    }

    /**
     * Starts a new game round.
     * @returns {Round} The Round class instance
     */
    startRound() {
        let self = this;
        let round = new Round(
            self.currentTeam,
            self.roundDuration,
            self.words,
            self.endRound.bind(self)
        );

        //self.addClass('gameContainer', 'hidden');

        document.getElementById('gameContainer').setAttribute('style', 'display: none;');

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

        self.setText(`game-team${currentTeam.id}-score`, currentTeam.score);
        //document.getElementById(`game-team${currentTeam.id}-score`).textContent = currentTeam.score;
        document.getElementById('gameContainer').setAttribute('style', 'display: block;');

        if (team1.rounds !== team2.rounds || (team1.score < self.scoreToWin && team2.score < self.scoreToWin)) {
            self.switchTeam();
            return;
        }

        if (team1.score === team2.score) {
            self.switchTeam();
            self.setText('game-status', 'Дополнительный ход');
            //document.getElementById('game-status').textContent = 'Дополнительный ход';
            return;
        }

        self.setText('game-status', 'Победа');
        //document.getElementById('game-status').textContent = 'Победа';
        self.setText('game-current-team-name', team1.score > team2.score
            ? team1.name
            : team2.name
        );
        /*document.getElementById('game-current-team-name').textContent = team1.score > team2.score
            ? team1.name
            : team2.name;*/
        document.getElementById('startRoundButton').setAttribute('style', 'display: none;');
        document.getElementById('game-button-new-game').setAttribute('style', 'display: block;');
    }
}
