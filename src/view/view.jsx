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
                //currentWord={game.dictionary.getRandomWord()}
                getWord={game.dictionary.getRandomWord.bind(game.dictionary)}
            />,
            document.getElementById('root')
        );

        move.start(Date.now());

        const intervalId = setInterval(() => {
            move.tick(Date.now());
    
            if (move.isFinished()) {
                clearInterval(intervalId);
            }
        }, 1000);
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
