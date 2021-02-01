import React from 'react';

export default class MoveForm extends React.Component {

    constructor({ duration, getWord, move }) {
        super();

        this.state = {
            score: 0,
            duration: duration,
            currentWord: getWord()
        };
    }

    componentDidMount = () => {
        const move = this.props.move;
        move.start(Date.now());

        const intervalId = setInterval(() => {
            move.tick(Date.now());

            this.setState(prevState => {
                return { duration: prevState.duration - 1 };
            });

            if (move.isFinished()) {
                clearInterval(intervalId);
                this.props.onFinish(this.state.score);
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
        this.setState({
            currentWord: this.props.getWord()
        });
    }

    render() {
        return (
            <div className="move-container">
                <ProgressBar timeLeft={this.state.duration} />
                <Score score={this.state.score} />
                <WordCard word={this.state.currentWord} />
                <div className="move-buttons-container">
                    <button onClick={this.setNewWord}>Пропустить слово</button>
                    <button onClick={this.onButtonNextClick}>Засчитать слово</button>
                </div>
            </div>
        )
    }
}

const ProgressBar = ({ timeLeft }) => (
    <div>
        <div class="progress-bar">
            <span class="bar">
                <span class="progress"></span>
            </span>
        </div>
        <div className="move-timer">{timeLeft}</div>
    </div>
);

const WordCard = ({ word }) => (
    <div class="move-card-container">
        <div class="card">
            <span>{word}</span>
        </div>
        <div class="card"></div>
        <div class="card"></div>
    </div>
);

const Score = ({ score }) => (
    <div className="move-score-container">
        <label>Очки: </label>
        <span>{score}</span>
    </div>
);
