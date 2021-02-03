import React from 'react';

const ProgressBar = ({ duration, timeLeft }) => (
    <div>
        <div className="progress-bar">
            <span className="bar">
                <span
                    className="progress"
                    style={{ "--progress-animation-duration": duration + "s" }}
                />
            </span>
        </div>
        <div className="move-timer">{timeLeft}</div>
    </div>
);

export default ProgressBar;
