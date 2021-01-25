export class Move {
    private readonly moveDurationMilliseconds: number;
    private initialMilliseconds: number | undefined;
    private currentMilliseconds: number | undefined;

    constructor(moveDurationMilliseconds: number) {
        this.moveDurationMilliseconds = moveDurationMilliseconds;
    }

    start(initialMilliseconds: number) {
        this.initialMilliseconds = initialMilliseconds;
    }

    tick(currentMilliseconds: number) {
        this.currentMilliseconds = currentMilliseconds;
    }

    isFinished(): boolean {
        if (this.initialMilliseconds && this.currentMilliseconds) {
            return this.currentMilliseconds - this.initialMilliseconds >= this.moveDurationMilliseconds;
        }

        return false;
    }
}
