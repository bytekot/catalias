import { Move } from "../src/ts/core/Move";

test('End move after waiting', () => {
    const moveDurationMilliseconds = 60000;
    const startMilliseconds = Date.now();
    const move = new Move(moveDurationMilliseconds);

    move.start(startMilliseconds);
    move.tick(startMilliseconds + moveDurationMilliseconds);

    expect(move.isFinished()).toBe(true);
});
