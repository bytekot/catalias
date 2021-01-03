import { Base } from './base.js';
import { Game } from './game.js';

export class Catalias extends Base {
    constructor() {
        super();

        this.elementId = 'settingsContainer';
        this.template = [
            '<div id="settingsContainer">',
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
                    '<button id="startGameButton">Играть</button>',
                '</div>',
            '</div>',
        ];
    }

    init() {
        let self = this;

        self.render();
        self.addListener('startGameButton', 'click', 'startGame');
    }

    getTeamName(teamIndex) {
        return this.getFieldValue(`team${teamIndex}-namefield`);
    }

    startGame() {
        let self = this;

        self.addClass(self.elementId, 'hidden');

        self.game = new Game(
            self.getTeamName(1),
            self.getTeamName(2),
            {
                roundDuration: 100,
                scoreToWin: 10,
                onGameEnd: self.onGameEnd.bind(self)
            }
        ).start();
    }

    onGameEnd() {
        this.removeClass(self.elementId, 'hidden');
    }
}
