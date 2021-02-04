import React from 'react';
import TeamsFieldset from '../fieldset/Teams.jsx';
import DictionariesFieldset from '../fieldset/Dictionaries.jsx';
import AdditionalSettingsFieldset from '../fieldset/AdditionalSettings.jsx';

export default class SettingsWindow extends React.Component {
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
            <div className="settings-window-container">
                <div className="settings-container">
                    <TeamsFieldset
                        teamNames={this.state.teamNames}
                    />
                    <div>
                        <DictionariesFieldset
                            dictionaries={this.state.dictionaries}
                        />
                        <AdditionalSettingsFieldset
                            moveDuration={this.state.moveDuration}
                            scoreToWin={this.state.scoreToWin}
                            updateHandler={this.updateState}
                        />
                    </div>
                </div>
                <div className="button-container">
                    <button
                        className="button"
                        onClick={this.onNewGameButtonClick}
                    >
                        <span>Играть</span>
                    </button>
                </div>
            </div>
        );
    }
}
