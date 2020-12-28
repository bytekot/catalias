const WORDS = [
    'Путин',
    'Чупа-чупс',
    'Позор',
    'Изолента',
    'Лицемерие',
    'Хот-дог',
];

export function getRandomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
}