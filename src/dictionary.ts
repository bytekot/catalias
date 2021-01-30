const WORDS = [
    'Изолента',
    'Лицемерие',
    'Алиби',
    'Нотариус',
    'Роскошь',
    'Гуманоид',
    'Натуралист',
    'Мушкетер',
    'Эскалатор',
    'Родник',
    'Пастила',
    'Коррозия',
    'Мигрень',
    'Материя',
    'Балласт',
    'Фестиваль',
    'Радиатор',
    'Бижутерия',
    'Факир',
    'Дискриминация',
];

/**
 * Returns a clone of the word list.
 * @returns {array}
 */
export function getWords(): Array<string> {
    return [...WORDS];
}