import React from 'react';
import DisplayField from '../field/Display.jsx';

export default class GameWindow extends React.Component {

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
        const game = this.state.game;
        const finished = game.isFinished();

        return (
            <div>
                <Status 
                    finished={finished}
                    teamName={!finished ? game.getCurrentTeam().name : game.getWinnerName()}
                />
                <div className="card-container">
                    <div className="card">
                        <TeamNames teams={game.teams} />
                        <DisplayField
                            label="Очки для победы"
                            value={this.props.scoreToWin}
                        />
                    </div>
                </div>
                <div class="button-container">
                    <button 
                        class={finished ? "hidden" : ""}
                        onClick={this.onNewMoveButtonClick}
                    >   Начать ход
                    </button>
                    <button
                        class={!finished ? "hidden" : ""}
                        onClick={this.props.onFinish}
                    >   Новая игра
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

const Status = ({ finished, teamName }) => (
    <div class="title">
        <span>{!finished ? "Ход" : "🏆 Победа"} команды </span>
        <span>"{teamName}"</span>
    </div>
);
