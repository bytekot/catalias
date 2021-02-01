import React from 'react';

export default class MoveForm extends React.Component {

    constructor({ duration, getWord, move }) {
        super();

        this.state = {
            score: 0,
            duration: duration,
            timeLeft: duration,
            currentWord: getWord()
        };
    }

    componentDidMount = () => {
        const move = this.props.move;
        move.start(Date.now());

        // Note: needs to move this code to the progress bar
        const intervalId = setInterval(() => {
            move.tick(Date.now());

            this.setState(prevState => {
                return { timeLeft: prevState.timeLeft - 1 };
            });

            if (move.isFinished()) {
                clearInterval(intervalId);
            }
        }, 1000);
    }

    onButtonNextClick = () => {
        this.setState(prevState => {
            return { score: prevState.score + 1 };
        });
        this.setNewWord();
    }

    setNewWord = () => {
        if (!this.props.move.isFinished()) {
            this.setState({
                currentWord: this.props.getWord()
            });

            return;
        }

        /**
         * Pause to briefly show the updated move score.
         * Note: it is necessary to make a general timeout for all button click handlers.
         */
        setTimeout(() => {
            this.props.onFinish(this.state.score);
        }, 100);
        
    }

    render() {
        return (
            <div className="move-container">
                <ProgressBar
                    duration={this.state.duration}
                    timeLeft={this.state.timeLeft}
                />
                <Score score={this.state.score} />
                <WordCard word={this.state.currentWord} />
                <div className="move-buttons-container">
                    <button onClick={this.setNewWord}>&#10060; Пропустить слово</button>
                    <button onClick={this.onButtonNextClick}>&#10004; Засчитать слово</button>
                </div>
            </div>
        )
    }
}

const ProgressBar = ({ duration, timeLeft }) => (
    <div>
        <div className="progress-bar">
            <span className="bar">
                <span
                    className="progress"
                    style={{ "--progress-animation-duration": duration + "s" }}
                />
            </span>
        </div>
        <div className="move-timer">{timeLeft}</div>
    </div>
);

const WordCard = ({ word }) => (
    <div className="move-card-container">
        <div className="card">
            <span className="move-word">{word}</span>
        </div>
        <div className="card"></div>
        <div className="card"></div>
    </div>
);

const Score = ({ score }) => (
    <div className="move-score-container">
        <label>Очки: </label>
        <span>{score}</span>
    </div>
);
