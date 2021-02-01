import React from 'react';
import TextField from '../field/Text.jsx';
import CheckboxField from '../field/Checkbox.jsx';

export default class SettingsForm extends React.Component {
    state = {
        teamNames: ['Бешеные псы', 'Бесславные ублюдки'],
        teamsNumber: 2,
        moveDuration: 60,
        scoreToWin: 30
    };

    updateState = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onNewGameButtonClick = () => this.props.onButtonClick(this.state);

    render() {
        return (
            <div>
                <Teams
                    teamsNumber={this.state.teamsNumber}
                    teamNames={this.state.teamNames}
                />
                <Dictionaries />
                <Settings
                    moveDuration={this.state.moveDuration}
                    scoreToWin={this.state.scoreToWin}
                    updateHandler={this.updateState}
                />
                <div className="button-container">
                    <button onClick={this.onNewGameButtonClick}>Играть</button>
                </div>
            </div>
        );
    }
}

class Teams extends React.Component {
    state = {
        teamsNumber: this.props.teamsNumber
    };

    addTeam = () => {
        this.setState(prevState => (
            { teamsNumber: prevState.teamsNumber + 1 }
        ));
    }

    updateHandler = event =>
        this.props.teamNames[event.target.name] = event.target.value;

    render() {
        return (
            <fieldset>
                <legend>Команды</legend>
                {
                    Array.from({ length: this.state.teamsNumber }, (_value, index) =>
                        <TeamNameField
                            teamId={index}
                            defaultValue={this.props.teamNames[index] || ''}
                            onBlur={this.updateHandler}
                        />
                    )
                }
                <div className="button-container">
                <button onClick={this.addTeam}>Добавить</button>
                </div>
            </fieldset>
        )
    }
};

const TeamNameField = ({ teamId, ...rest }) => (
    <TextField
        name={teamId}
        label={`Команда ${teamId + 1}`}
        {...rest}
    />
);

const Dictionaries = () => (
    <fieldset>
        <legend>Наборы слов</legend>
        <CheckboxField
            name="words"
            label="Базовый набор"
        />
    </fieldset>
);

const Settings = ({ moveDuration, scoreToWin, updateHandler }) => (
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
