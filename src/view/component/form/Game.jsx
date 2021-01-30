import React from 'react';
import ReactDOM from 'react-dom';
import DisplayField from '../field/Display.jsx';
import MoveForm from './Move.jsx';

class GameForm extends React.Component {
    props = {
        teamNames: [],
        scoreToWin: 0
    };

    getTeamScoreFields = () => (
        this.props.teamNames.map((teamName, index) =>
            <DisplayField
                name="game-team-name"
                label={teamName}
                value={0}
            />
        )
    )

    onButtonClick = event => {
        const state = this.state;

        ReactDOM.render(
            <MoveForm
            />,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <div id="game-container">
                { this.getTeamScoreFields()}
                <DisplayField
                    name="game-score-to-win"
                    label="Очки для победы"
                    value={this.props.scoreToWin}
                />

                <div class="title">
                    <span id="game-status">Ход команды </span>
                    <span id="current-team-name">"{this.props.teamNames[0]}"</span>
                </div>

                <div class="button-container">
                    <button id="button-start-move" onClick={this.onButtonClick}>Начать ход</button>
                    <button id="button-new-game" class="hidden">Новая игра</button>
                </div>
            </div>
        )
    }
}

export default GameForm;
