import React, { Component } from 'react';

class SettingsView extends Component {
    render() {
        return (
            <div id="settings-container">
                <fieldset>
                    <legend>Команды</legend>
                    <div className="field-container team-name-container">
                        <input id="team1-namefield" className="textfield" placeholder="Название команды 1" value="Бешеные псы"
                            autofocus></input>
                    </div>
                    <div className="field-container team-name-container">
                        <input id="team2-namefield" className="textfield" placeholder="Название команды 2"
                            value="Бесславные ублюдки"></input>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Наборы слов</legend>
                    <div className="field-container">
                        <input type="checkbox" checked disabled></input>
                        <label>Базовый набор</label>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Настройки</legend>
                    <div className="field-container">
                        <label>Продолжительность хода (сек.)</label>
                        <input id="settings-move-duration" className="textfield" value="30"></input>
                    </div>
                    <div className="field-container">
                        <label>Очков для победы</label>
                        <input id="settings-score-to-win" className="textfield" value="10"></input>
                    </div>
                </fieldset>

                <div className="button-container">
                    <button id="button-start-game">Играть</button>
                </div>
            </div>
        );
    }
}
