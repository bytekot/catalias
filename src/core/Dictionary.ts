import { getWords } from "../dictionary";

export class Dictionary {
    public readonly words: string[];

    constructor() {
        this.words = getWords();
    }

    /**
     * Returns a random word and excludes it from the dictionary.
     *
     * @returns {string}
     */
    getRandomWord(): string {
        const words = this.words;
        const randomWord = words[Math.floor(Math.random() * words.length)];

        words.splice(words.indexOf(randomWord), 1);

        return randomWord;
    }
}