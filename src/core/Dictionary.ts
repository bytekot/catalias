import dictionary from '../dictionary.json';

export const dictionaryTypes: string[] = Object.keys(dictionary);

export const dictionaryReference = ((dictionary: any)=> {
    const reference: any = {};

    for (const type in dictionary) {
        reference[type] = dictionary[type].length;
    }

    return reference;
})(dictionary);

export class Dictionary {
    public readonly words: string[];

    constructor(types: string[] = []) {
        this.words = [];

        for (const type of types) {
            const words: any = dictionary;

            this.words = this.words.concat(
                words[type].map((word: string) => ({
                    word: word,
                    dictionary: type,
                }))
            );
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
