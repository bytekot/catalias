import { Dictionary, Team, Game, Move } from '../src/ts/core';

const team1 = new Team('Team 1');
const team2 = new Team('Team 2');
const dictionary = new Dictionary();

const game = new Game(
    [team1, team2],
    dictionary,
    {
        moveDuration: 10,
        scoreToWin: 10
    }
);

test('Get current round test', () => {
    expect(game.getCurrentRound()).toBe(0);
});
