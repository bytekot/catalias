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

    // todo: team names
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
            <div>
                <TeamSet
                    teamName1={this.state.teamName1}
                    teamName2={this.state.teamName2}
                    updateHandler={this.updateState}
                />
                <DictionarySet />
                <SettingSet 
                    moveDuration={this.state.moveDuration}
                    scoreToWin={this.state.scoreToWin}
                    updateHandler={this.updateState}
                />
                <div className="button-container">
                    <button name="button-start-game" onClick={this.onNewGameButtonClick}>Играть</button>
                </div>
            </div>
        );
    }
}

const TeamSet = ({ teamName1, teamName2, updateHandler }) => (
    <fieldset>
        <legend>Команды</legend>
        <TextField
            name="teamName1"
            label="Команда 1"
            defaultValue={teamName1}
            onBlur={updateHandler}
        />
        <TextField
            name="teamName2"
            label="Команда 2"
            defaultValue={teamName2}
            onBlur={updateHandler}
        />
    </fieldset>
);

const DictionarySet = () => (
    <fieldset>
        <legend>Наборы слов</legend>
        <CheckboxField
            name="words"
            label="Базовый набор"
        />
    </fieldset>
);

const SettingSet = ({ moveDuration, scoreToWin, updateHandler }) => (
    <fieldset>
        <legend>Настройки</legend>
        <TextField
            name="moveDuration"
            label="Продолжительность хода (сек.)"
            defaultValue={moveDuration}
            onBlur={updateHandler}
        />
        <TextField
            name="scoreToWin"
            label="Очков для победы"
            defaultValue={scoreToWin}
            onBlur={updateHandler}
        />
    </fieldset>
);
