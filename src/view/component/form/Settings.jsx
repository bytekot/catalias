import React from 'react';
import ReactDOM from 'react-dom';
import TextField from '../field/Text.jsx';
import CheckboxField from '../field/Checkbox.jsx';
import GameForm from './Game.jsx';

class SettingsForm extends React.Component {
    state = {
        teamName1: '',
        teamName2: '',
        moveDuration: 0,
        scoreToWin: 0
    };

    updateState = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onButtonClick = event => {
        const state = this.state;

        ReactDOM.render(
            <GameForm
                teamNames={[state.teamName1, state.teamName2]}
                scoreToWin={state.scoreToWin}
            />,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <div name="settings-container">
                <fieldset>
                    <legend>Команды</legend>
                    <TextField
                        name="teamName1"
                        label="Команда 1"
                        onBlur={this.updateState}
                    />
                    <TextField
                        name="teamName2"
                        label="Команда 2"
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
                        onBlur={this.updateState}
                    />
                    <TextField
                        name="scoreToWin"
                        label="Очков для победы"
                        onBlur={this.updateState}
                    />
                </fieldset>

                <div className="button-container">
                    <button name="button-start-game" onClick={this.onButtonClick}>Играть</button>
                </div>
            </div>
        );
    }
}

export default SettingsForm;
