import React from 'react';
import CheckboxField from '../field/Checkbox.jsx';
import { dictionaryTypes } from '../../../core/Dictionary';
import { dictionaryReference } from '../../../core/Dictionary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

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
            dictionaries.splice(dictionaries.indexOf(name), 1);
        }
    };

    return (
        <fieldset>
            <legend>
                <FontAwesomeIcon icon={faBook} />
                <span>Наборы слов</span>
            </legend>
            {
                dictionaryTypes.map(type =>
                    <CheckboxField
                        name={type}
                        label={type}
                        subLabel={`(${dictionaryReference[type]})`}
                        defaultChecked={dictionaries.includes(type)}
                        onBlur={onBlur}
                    />
                )
            }
        </fieldset>
    );
};

export default DictionariesFieldset;
