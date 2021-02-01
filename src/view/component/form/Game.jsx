import React from 'react';
import DisplayField from '../field/Display.jsx';

export default class GameForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            game: props.game
        };
    }

    onNewMoveButtonClick = event => {
        this.props.onButtonClick({});
    }

    render() {
        return (
            <div>
                <TeamNames teams={this.state.game.teams} />

                <DisplayField
                    label="Очки для победы"
                    value={this.props.scoreToWin}
                />

                <div class="title">
                    <span>Ход команды </span>
                    <span>"{this.state.game.getCurrentTeam().name}"</span>
                </div>

                <div class="button-container">
                    <button 
                        class={this.state.game.isFinished() ? "hidden" : ""}
                        onClick={this.onNewMoveButtonClick}
                    >Начать ход
                    </button>
                    <button
                        class={!this.state.game.isFinished() ? "hidden" : ""}
                        onClick={this.props.onFinish}
                    >Новая игра
                    </button>
                </div>
            </div>
        )
    }
}

const TeamNames = ({ teams }) => (
    teams.map(team =>
        <DisplayField
            label={team.name}
            value={team.score}
        />
    )
);
