import React from 'react';

class MoveForm extends React.Component {
    props = {
        score: 0,
        currentWord: null
    };

    render() {
        return (
            <div id="move-container">
                <div class="progress-bar">
                    <span class="bar">
                        <span class="progress"></span>
                    </span>
                </div>
                <div id="move-timer"></div>
                <div id="move-score-container">
                    <label>Очки: </label>
                    <span id="move-score">{this.props.score}</span>
                </div>
                <div class="move-card-container">
                    <div class="card">
                        <span id="current-word">{this.props.currentWord}</span>
                    </div>
                    <div class="card"></div>
                    <div class="card"></div>
                </div>

                <div id="move-buttons-container">
                    <button id="button-move-skip-word">Пропустить слово</button>
                    <button id="button-move-next-word">Следующее слово</button>
                </div>
            </div>
        )
    }
}

export default MoveForm;
