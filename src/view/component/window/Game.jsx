import React from 'react';
import DisplayField from '../field/Display.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

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
        const currentTeamName = game.getCurrentTeam().name;

        return (
            <div className="game-window-container">
                <DisplayField
                    label="Очки для победы"
                    value={this.props.scoreToWin}
                />
                <Status 
                    finished={finished}
                    teamName={!finished ? game.getCurrentTeam().name : game.getWinnerName()}
                />
                <TeamNames
                    teams={game.teams}
                    currentTeam={currentTeamName}
                />
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

const TeamNames = ({ teams, currentTeam }) => (
    <div className="game-teams-container">
    {
        teams.map(team => {
            const current = currentTeam === team.name;

            return (
                <div style={{'position': 'relative'}}>
                    {current ? <FontAwesomeIcon icon={faLongArrowAltRight} size="2x" /> : ''}
                    <div className={`team-card ${current ? "current" : ""}`}>
                        <DisplayField
                            label={team.name}
                            value={team.score}
                        />
                    </div>
                </div>
            );
        })
    }
    </div>
);

const Status = ({ finished, teamName }) => (
    <div class="title">
        <span>{!finished ? "Ход" : "Победа"} команды </span>
        <span>"{teamName}"</span>
    </div>
);
