import React from 'react';
import TextField from '../field/Text.jsx';
import CheckboxField from '../field/Checkbox.jsx';

export default class SettingsForm extends React.Component {
    state = {
        teamName1: 'Бешеные псы',
        teamName2: 'Бесславные ублюдки',
        moveDuration: 60,
        scoreToWin: 30
    };

    updateState = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onNewGameButtonClick = event => {
        const state = this.state;

        this.props.onButtonClick({
            teamNames: [state.teamName1, state.teamName2],
            moveDuration: state.moveDuration,
            scoreToWin: state.scoreToWin
        });
    }

    render() {
        return (
            <div name="settings-container">
                <fieldset>
                    <legend>Команды</legend>
                    <TextField
                        name="teamName1"
                        label="Команда 1"
                        defaultValue={this.state.teamName1}
                        onBlur={this.updateState}
                    />
                    <TextField
                        name="teamName2"
                        label="Команда 2"
                        defaultValue={this.state.teamName2}
                        onBlur={this.updateState}
                    />
                </fieldset>

                <fieldset>
                    <legend>Наборы слов</legend>
                    <CheckboxField
                        name="words"
                        label="Базовый набор"
                    />
                </fieldset>

                <fieldset>
                    <legend>Настройки</legend>
                    <TextField
                        name="moveDuration"
                        label="Продолжительность хода (сек.)"
                        defaultValue={this.state.moveDuration}
                        onBlur={this.updateState}
                    />
                    <TextField
                        name="scoreToWin"
                        label="Очков для победы"
                        defaultValue={this.state.scoreToWin}
                        onBlur={this.updateState}
                    />
                </fieldset>

                <div className="button-container">
                    <button name="button-start-game" onClick={this.onNewGameButtonClick}>Играть</button>
                </div>
            </div>
        );
    }
}
