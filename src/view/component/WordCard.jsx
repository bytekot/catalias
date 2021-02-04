import React, { useState, useEffect, useRef } from 'react';

const WordCard = ({ word, dictionary }) => {
    const [animated, setAnimated] = useState(false);
    const previousWordReference = useRef();
    const previousWordData = previousWordReference.current;

    useEffect(() => {
        if (typeof previousWordData !== 'undefined' && previousWordData.word !== word) {
            setAnimated(true);

            const timerId = setTimeout(() => {
                previousWordReference.current = {
                    word: word,
                    dictionary: dictionary
                };
                setAnimated(false);
            }, 400);

            return () => clearTimeout(timerId);
        }

        previousWordReference.current = {
            word: word,
            dictionary: dictionary
        };
    }, [word]);

    return (
        <div className="card-container">
            <div className={`card ${animated ? 'animated' : ''}`}>
                <span className="move-word">
                    <span>{!animated ? word : previousWordData.word}</span>
                    <p className="sub-label">({!animated ? dictionary : previousWordData.dictionary})</p>
                </span>
            </div>
            <div className="card"></div>
            <div className="card"></div>
        </div>
    );
};

export default WordCard;
