import React from 'react';

const DisplayField = ({ name, value, label }) => (
    <div class="field-container">
        <label>{label}: </label>
        <span name={name}>{value}</span>
    </div>
);

export default DisplayField;
