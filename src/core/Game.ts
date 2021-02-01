import { Dictionary } from "./Dictionary";
import { Team } from "./Team";


export class Game {
    public readonly teams: readonly Team[];
    public readonly dictionary: Dictionary;
    public readonly moveDuration: number;
    public readonly scoreToWin: number;

    constructor(
        teams: readonly Team[],
        dictionary: Dictionary,
        options: { moveDuration: number; scoreToWin: number; }
    ) {
        this.teams = teams;
        this.dictionary = dictionary;
        this.moveDuration = options.moveDuration;
        this.scoreToWin = options.scoreToWin;
    }

    getCurrentRound(): number {
        return this.teams[0].moves;
    }

    getCurrentTeam(): Team {
        const currentRound = this.getCurrentRound();

        let currentTeam: Team;

        for (const team of this.teams) {
            if (team.moves < currentRound) {
                currentTeam = team;

                break;
            }
        }

        return (typeof currentTeam !== 'undefined') ? currentTeam : this.teams[0];
    }

    isFinished(): boolean {
        const currentRound = this.getCurrentRound();

        for (const team of this.teams) {
            if (team.moves != currentRound) {
                return false;
            }
        }

        return this.teams.some((team) => {
            return team.score >= this.scoreToWin;
        }) && !this.isAdditionalRoundNeeded();
    }

    isAdditionalRoundNeeded(): boolean {
        const enoughPoints = [];

        for (const team of this.teams) {
            if (team.score >= this.scoreToWin) {
                if (enoughPoints.includes(team.score)) {
                    return true;
                }

                enoughPoints.push(team.score);
            }
        }

        return false;
    }

    getWinnerName(): string | null {
        const team = this.teams.find(team => team.score >= this.scoreToWin);

        return typeof team !== 'undefined' ? team.name : null;
    }
}
