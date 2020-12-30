import { Game } from './game.js';

export class Catalias {
    constructor() {
        let self = this;

        self.template = [
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
                '<button id="startGameButton">Играть</button>',
            '</div>',
        ];
    }

    init() {
        let self = this;

        document.getElementById('appContainer').insertAdjacentHTML('beforeend', self.template.join(''));
        document.getElementById('startGameButton').addEventListener('click', self.startGame.bind(self), false);
    }

    startGame() {
        let self = this;
        let team1Name = document.getElementById('team1-namefield').getAttribute('value');
        let team2Name = document.getElementById('team2-namefield').getAttribute('value');
        let scoreToWin = 10;

        document.getElementById('settingsContainer').setAttribute('style', 'display: none;');

        self.game = new Game(
            team1Name,
            team2Name,
            {
                roundDuration: 10,
                scoreToWin: scoreToWin
            }
        ).start();
    }
}
