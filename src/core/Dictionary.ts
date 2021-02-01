import dictionary from '../dictionary.json';

export const dictionaryTypes = Object.keys(dictionary);

export class Dictionary {
    public readonly words: string[];

    constructor(types = []) {
        this.words = [];

        for (const type of types) {
            this.words = this.words.concat(dictionary[type]);
        }
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
