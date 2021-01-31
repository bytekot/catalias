import React from 'react';

export default class MoveForm extends React.Component {
    constructor({ duration, getWord }) {
        super();
        this.state = {
            score: 0,
            duration: duration,
            currentWord: getWord()
        };
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
            <div name="moveForm" id="move-container">
                <div class="progress-bar">
                    <span class="bar">
                        <span class="progress"></span>
                    </span>
                </div>
                <div id="move-timer">{this.state.duration}</div>
                <div id="move-score-container">
                    <label>Очки: </label>
                    <span id="move-score">{this.state.score}</span>
                </div>
                <div class="move-card-container">
                    <div class="card">
                        <span id="current-word">{this.state.currentWord}</span>
                    </div>
                    <div class="card"></div>
                    <div class="card"></div>
                </div>

                <div id="move-buttons-container">
                    <button name="buttonSkip" onClick={this.setNewWord}>Пропустить слово</button>
                    <button name="buttonNext" onClick={this.onButtonNextClick}>Засчитать слово</button>
                </div>
            </div>
        )
    }
}
