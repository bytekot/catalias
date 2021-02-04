import React from 'react';
import ReactDOM from 'react-dom';
import Header from './component/Header.jsx';
import SettingsWindow from './component/window/Settings.jsx';
import GameWindow from './component/window/Game.jsx';
import MoveWindow from './component/window/Move.jsx';
import { Move } from '../core/Move';
import { Team } from '../core/Team';
import { Game } from '../core/Game';
import { Dictionary } from '../core/Dictionary';

class App extends React.Component {

    state = {};

    onMoveEnd = (score) => {
        const currentTeam = this.state.game.getCurrentTeam();
        currentTeam.tickMove(score);

        this.setState({
            move: undefined
        });
    }

    onGameEnd = () => {
        this.setState({
            move: undefined,
            game: undefined
        });
    }

    onNewMoveButtonClick = () => {
        this.setState({
            move: new Move(this.state.game.moveDuration * 1000)
        });
    }

    onNewGameButtonClick = ({ teamNames, dictionaries, moveDuration, scoreToWin }) => {
        const teams = teamNames.map(name => new Team(name));
        const dictionary = new Dictionary(dictionaries);
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
        let window;

        if (state.move) {
            window =
                <MoveWindow
                    duration={state.moveDuration}
                    getWord={state.game.dictionary.getRandomWord.bind(state.game.dictionary)}
                    move={state.move}
                    onFinish={this.onMoveEnd}
                />
        } else {
            window = !state.game
                ? <SettingsWindow onButtonClick={this.onNewGameButtonClick} />
                : <GameWindow
                    teamNames={state.teamNames}
                    scoreToWin={state.scoreToWin}
                    onButtonClick={this.onNewMoveButtonClick}
                    game={state.game}
                    onFinish={this.onGameEnd}
                />
        }

        return (
            <div>
                <Header onClick={this.onGameEnd} />
                {window}
            </div>
        );
    }
}

document.addEventListener('DOMContentLoaded',  () => (
    ReactDOM.render(<App />, document.body)
));
