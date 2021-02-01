import React from 'react';
import ReactDOM from 'react-dom';
import SettingsForm from './component/form/Settings.jsx';
import GameForm from './component/form/Game.jsx';
import MoveForm from './component/form/Move.jsx';
import { Move } from '../core/Move';
import { Team } from '../core/Team';
import { Game } from '../core/Game';
import { Dictionary } from '../core/Dictionary';

class App extends React.Component {

    state = {};

    onNewMoveButtonClick = () => {
        this.setState({
            move: new Move(this.state.game.moveDuration * 1000)
        });
    }

    onNewGameButtonClick = ({ teamNames, moveDuration, scoreToWin }) => {
        const teams = teamNames.map(name => new Team(name));
        const dictionary = new Dictionary();
        const game = new Game(teams, dictionary, {
            moveDuration: moveDuration,
            scoreToWin: scoreToWin
        });

        this.setState({
            teamNames: teamNames,
            moveDuration: moveDuration,
            scoreToWin: scoreToWin,
            game: game
        });
    }

    render() {
        const state = this.state;

        if (state.move) {
            return (
                <MoveForm
                    duration={state.moveDuration}
                    getWord={state.game.dictionary.getRandomWord.bind(state.game.dictionary)}
                    move={state.move}
                />
            )
        }

        return (
            !state.game
                ? <SettingsForm onButtonClick={this.onNewGameButtonClick} />
                : <GameForm
                    teamNames={state.teamNames}
                    scoreToWin={state.scoreToWin}
                    onButtonClick={this.onNewMoveButtonClick}
                    hidden={state.hidden1}
                />
        );
    }
}

document.addEventListener("DOMContentLoaded", () => 
    ReactDOM.render(<App />, document.getElementById('root'))
);
