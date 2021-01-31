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

    onNewMoveButtonClick = () => {
        const game = this.props.game;
        const move = new Move(game.moveDuration * 1000);
        
        ReactDOM.render(
            <MoveForm
                duration={game.moveDuration}
                getWord={game.dictionary.getRandomWord.bind(game.dictionary)}
                move={move}
            />,
            document.getElementById('root')
        );
    }

    onNewGameButtonClick = ({ teamNames, moveDuration, scoreToWin }) => {
        const teams = teamNames.map(name => new Team(name));
        const dictionary = new Dictionary();

        this.props.game = new Game(teams, dictionary, {
            moveDuration: moveDuration,
            scoreToWin: scoreToWin
        });

        ReactDOM.render(
            <GameForm
                teamNames={teamNames}
                scoreToWin={scoreToWin}
                onButtonClick={this.onNewMoveButtonClick}
            />,
            document.getElementById('root')
        );
    }

    render() {
        return <SettingsForm onButtonClick={this.onNewGameButtonClick} />;
    }
}

document.addEventListener("DOMContentLoaded", () => 
    ReactDOM.render(<App />, document.getElementById('root'))
);
