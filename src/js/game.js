import { Round } from './round.js';

export class Game {
    constructor() {}

    start() {
        let round = new Round();

        this.currentRound = round;
        this.currentRound.start();
    }
}
