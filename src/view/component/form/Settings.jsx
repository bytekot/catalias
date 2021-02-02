import React, { useState } from 'react';
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

const Teams = ({ teamNames }) => {
    const [teamsNumber, setTeamsNumber] = useState(2);

    return (
        <fieldset>
            <legend>
                <span>Команды</span>
                <button
                    className="small"
                    onClick={() => setTeamsNumber(teamsNumber + 1)}
                >&#43; Добавить
                </button>
            </legend>
            {
                Array.from({ length: teamsNumber }, (_value, index) =>
                    <TeamNameField
                        teamId={index}
                        defaultValue={teamNames[index] || ''}
                        onBlur={(event) => teamNames[index] = event.target.value}
                    />
                )
            }
        </fieldset>
    );
};

const TeamNameField = ({ teamId, ...rest }) => (
    <TextField
        name={teamId}
        label={`Команда ${teamId + 1}`}
        {...rest}
    />
);

const Dictionaries = ({ dictionaries }) => {
    const onBlur = event => {
        const name = event.target.name;
        const checked = event.target.checked;
        const included = dictionaries.includes(name);

        if (checked && !included) {
            dictionaries.push(name);
            return;
        }

        if (!checked && included) {
            dictionaries.filter(dictionary => dictionary !== name);
        }
    };

    return (
        <fieldset>
            <legend>Наборы слов</legend>
            {
                dictionaryTypes.map(type =>
                    <CheckboxField
                        name={type}
                        label={type}
                        defaultChecked={dictionaries.includes(type)}
                        onBlur={onBlur}
                    />
                )
            }
        </fieldset>
    );
};

const Settings = ({ moveDuration, scoreToWin, updateHandler }) => (
    <fieldset>
        <legend>Настройки</legend>
        <TextField
            name="moveDuration"
            label="Длительность хода (сек.)"
            defaultValue={moveDuration}
            className="small"
            onBlur={updateHandler}
        />
        <TextField
            name="scoreToWin"
            label="Очки для победы"
            defaultValue={scoreToWin}
            className="small"
            onBlur={updateHandler}
        />
    </fieldset>
);
