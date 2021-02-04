import React, { useState, useEffect, useRef } from 'react';

const WordCard = ({ word, dictionary }) => {
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
                <span className="move-word">
                    <span>{!animated ? word : previousWord}</span>
                    <p className="sub-label">({dictionary})</p>
                </span>
            </div>
            <div className="card"></div>
            <div className="card"></div>
        </div>
    );
};

export default WordCard;
