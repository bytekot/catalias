export class Team {
    public readonly name: string;
    public score: number;
    public moves: number;

    constructor(name: string) {
        this.name = name;
        this.score = 0;
        this.moves = 0;
    }

    tickMove(score: number) {
        this.moves++;
        this.score = this.score + score;
    }
}
