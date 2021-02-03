import React from 'react';
import FieldLabel from './FieldLabel.jsx';

const BaseField = ({
    type,
    name,
    defaultValue,
    className,
    label,
    subLabel,
    onBlur,
    defaultChecked,
    labelPosition = 'before'
}) => (
    <div className="field-container team-name-container">
        {
            labelPosition === 'before' ? <FieldLabel labelText={label} subLabelText={subLabel} /> : ''
        }
        <input
            type={type}
            name={name}
            defaultValue={defaultValue}
            className={className}
            onBlur={onBlur}
            defaultChecked={defaultChecked}
        />
        {
            labelPosition === 'after' ? <FieldLabel labelText={label} subLabelText={subLabel} /> : ''
        }
    </div>
);

export default BaseField;
