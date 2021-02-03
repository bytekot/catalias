import React from 'react';
import TextField from '../field/Text.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'

const AdditionalSettingsFieldset = ({ moveDuration, scoreToWin, updateHandler }) => (
    <fieldset>
        <legend>
            <FontAwesomeIcon icon={faSlidersH} />
            <span>Настройки</span>
        </legend>
        <TextField
            name="moveDuration"
            label="Длительность хода"
            subLabel="(сек.)"
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
