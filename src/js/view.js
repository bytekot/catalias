class View {
    constructor() {}

    render() {
        document.getElementById(this.destination).insertAdjacentHTML('beforeend', this.template.join(''));
    }

    initEvents() {
        for (let event of this.events) {
            this.addListener(event.el, event.name, event.listener);
        }
    }

    addListener(element, event, listener) {
        let owner = this.owner;
        document.getElementById(element).addEventListener(event, owner[listener].bind(owner), false);
    }

    removeListener(element, event, listener) {
        document.getElementById(element).removeEventListener(event, this.owner[listener], false);
    }

    destroy() {
        // remove listeners

        let element = document.getElementById('roundContainer');
        element.parentNode.removeChild(element);
    }
}

class RoundView {
    constructor(owner, destination, teamScore) {
        this.owner = owner;
        this.destination = destination;
        this.teamScore = teamScore;
        this.template = [
            '<div id="roundContainer">',
                '<div class="progress-bar" >',
                    '<span class="bar">',
                        '<span class="progress"></span>',
                    '</span>',
                '</div>',
                '<div id="timer"></div>',
                '<div id="scoreContainer">',
                    '<label>Очки: </label>',
                    `<span id="score">${this.teamScore}</span>`,
                '</div>',
                '<div class="round-card-container">',
                    '<div class="card">',
                        '<span id="word"></span>',
                    '</div>',
                    '<div class="card"></div>',
                ' <div class="card"></div>',
                ' <div class="card"></div>',
            ' </div>',

                '<div id="inRoundButtonsContainer">',
                    '<button id="skipWordButton">Пропустить слово</button>',
                    '<button id="nextWordButton">Следующее слово</button>',
                '</div>',
            '</div >',
        ];
    }

    onWordChange(word) {
        document.getElementById('word').textContent = word;
    }

    onScoreChange(totalScore) {
        document.getElementById('score').textContent = totalScore;
    }

    onTimerChange(start) {
        document.getElementById('timer').textContent = start;
    }
}