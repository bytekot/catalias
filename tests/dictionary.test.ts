import { Dictionary } from "../src/core/Dictionary";

test('Extract and remove a word from a dictionary', () => {
    const dictionary = new Dictionary();
    const word = dictionary.getRandomWord();

    expect(dictionary.words).not.toContain(word);
});
