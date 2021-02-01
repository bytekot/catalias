import React from 'react';

const BaseField = ({
    type,
    name,
    defaultValue,
    className,
    label,
    onBlur,
    defaultChecked,
    labelPosition = 'before'
}) => (
    <div className="field-container team-name-container">
        {
            labelPosition === 'before' ? <label>{label}</label> : ''
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
            labelPosition === 'after' ? <label>{label}</label> : ''
        }
    </div>
);

export default BaseField;
