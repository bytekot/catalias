import { Base } from './base.js';
import { Game } from './game.js';

const MOVE_DURATION = 30;
const SCORE_TO_WIN = 10;

export class Catalias extends Base {
    constructor() {
        super();

        this.elementId = 'settings-container';
        this.template = [
            `<div id="${this.elementId}">`,
                '<fieldset>',
                    '<legend>Команды</legend>',
                    '<div class="field-container team-name-container">',
                        '<input id="team1-namefield" class="textfield" placeholder="Название команды 1" value="Бешеные псы" autofocus> VS',
                    '</div>',
            
                    '<div class="field-container team-name-container">',
                        '<input id="team2-namefield" class="textfield" placeholder="Название команды 2" value="Бесславные ублюдки">',
                    '</div>',
                '</fieldset>',
                '<fieldset>',
                    '<legend>Наборы слов</legend>',
                    '<div class="field-container">',
                        '<input type="checkbox" checked disabled>',
                        '<label>Базовый набор</label>',
                    '</div>',
                '</fieldset>',

                '<div class="button-container">',
                    '<button id="button-start-game">Играть</button>',
                '</div>',
            '</div>',
        ];
    }

    init() {
        this.render();
        this.addListener('button-start-game', 'click', 'startGame');
    }

    getTeamName(teamIndex) {
        return this.getFieldValue(`team${teamIndex}-namefield`);
    }

    startGame() {
        this.addClass(self.elementId, 'hidden');

        this.game = new Game(
            this.getTeamName(1),
            this.getTeamName(2),
            {
                moveDuration: MOVE_DURATION,
                scoreToWin: SCORE_TO_WIN,
                onGameEnd: this.onGameEnd.bind(this)
            }
        ).start();
    }

    onGameEnd() {
        this.removeClass(self.elementId, 'hidden');
    }
}
