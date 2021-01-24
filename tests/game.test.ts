import { Dictionary, Team, Game } from '../src/ts/core';

const team1 = new Team('Team 1');
const team2 = new Team('Team 2');
const dictionary = new Dictionary();
const moveDuration = 10;
const scoreToWin = 5;

const game = new Game(
    [team1, team2],
    dictionary,
    {
        moveDuration: moveDuration,
        scoreToWin: scoreToWin
    }
);

test('Get current round', () => {
    expect(game.getCurrentRound()).toBe(0);
});

test('Get current team', () => {
    expect(game.getCurrentTeam()).toBe(team1);
});

test('Is game finished', () => {
    expect(game.isFinished()).toBe(false);
});
