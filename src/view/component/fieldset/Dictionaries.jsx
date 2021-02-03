import React from 'react';
import CheckboxField from '../field/Checkbox.jsx';
import { dictionaryTypes } from '../../../core/Dictionary';

const DictionariesFieldset = ({ dictionaries }) => {
    const onBlur = event => {
        const name = event.target.name;
        const checked = event.target.checked;
        const included = dictionaries.includes(name);

        if (checked && !included) {
            dictionaries.push(name);
            return;
        }

        if (!checked && included) {
            dictionaries.filter(dictionary => dictionary !== name);
        }
    };

    return (
        <fieldset>
            <legend>Наборы слов</legend>
            {
                dictionaryTypes.map(type =>
                    <CheckboxField
                        name={type}
                        label={type}
                        defaultChecked={dictionaries.includes(type)}
                        onBlur={onBlur}
                    />
                )
            }
        </fieldset>
    );
};

export default DictionariesFieldset;
