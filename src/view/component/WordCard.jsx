import React, { useState, useEffect, useRef } from 'react';

const WordCard = ({ word }) => {
    const [animated, setAnimated] = useState(false);
    const previousWordReference = useRef();
    const previousWord = previousWordReference.current;

    useEffect(() => {
        if (typeof previousWord !== 'undefined' && previousWord !== word) {
            setAnimated(true);

            const timerId = setTimeout(() => {
                previousWordReference.current = word;
                setAnimated(false);
            }, 400);

            return () => clearTimeout(timerId);
        }

        previousWordReference.current = word;
    }, [word]);

    return (
        <div className="card-container">
            <div className={`card ${animated ? 'animated' : ''}`}>
                <span className="move-word">{!animated ? word : previousWord}</span>
            </div>
            <div className="card"></div>
            <div className="card"></div>
        </div>
    );
};

export default WordCard;
