import React from 'react';
import TextField from '../field/Text.jsx';

const AdditionalSettingsFieldset = ({ moveDuration, scoreToWin, updateHandler }) => (
    <fieldset>
        <legend>Настройки</legend>
        <TextField
            name="moveDuration"
            label="Длительность хода (сек.)"
            defaultValue={moveDuration}
            className="small"
            onBlur={updateHandler}
        />
        <TextField
            name="scoreToWin"
            label="Очки для победы"
            defaultValue={scoreToWin}
            className="small"
            onBlur={updateHandler}
        />
    </fieldset>
);

export default AdditionalSettingsFieldset;
