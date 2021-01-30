import React from 'react';

const BaseField = ({ type, name, className, label, onBlur }) => (
    <div className="field-container team-name-container">
        <label>{label}</label>
        <input
            type={type}
            name={name}
            className={className}
            onBlur={onBlur}
        />
    </div>
);

export default BaseField;
