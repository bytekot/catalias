import React from 'react';
import TextField from '../field/Text.jsx';
import CheckboxField from '../field/Checkbox.jsx';
import { dictionaryTypes } from '../../../core/Dictionary';

export default class SettingsForm extends React.Component {
    state = {
        teamNames: ['Бешеные псы', 'Бесславные ублюдки'],
        dictionaries: ['Базовый набор'],
        teamsNumber: 2,
        moveDuration: 60,
        scoreToWin: 30
    };

    updateState = event => {
        const target = event.target;

        this.setState({
            [target.name]: target.type !== 'checkbox' ? target.value : target.checked
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
                <Dictionaries
                    dictionaries={this.state.dictionaries}
                />
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
                <button onClick={this.addTeam}>Добавить</button>
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

class Dictionaries extends React.Component {
    updateHandler = event => {
        const dictionaries = this.props.dictionaries;

        if (event.target.checked && !dictionaries.includes(event.target.name)) {
            dictionaries.push(event.target.name);
        }

        if (!event.target.checked && dictionaries.includes(event.target.name)) {
            dictionaries.splice(dictionaries.indexOf(event.target.name), 1);
        }
    }

    render() {
        return (
            <fieldset>
                <legend>Наборы слов</legend>
                {
                    dictionaryTypes.map(type =>
                        <CheckboxField
                            name={type}
                            label={type}
                            onBlur={this.updateHandler}
                            defaultChecked={this.props.dictionaries.includes(type)}
                        />
                    )
                }
            </fieldset>
        );
    }
};

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
