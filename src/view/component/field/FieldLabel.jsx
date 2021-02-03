import React from 'react';

const FieldLabel = ({ labelText, subLabelText }) => (
    <label className="label">
        {labelText}
        <span className="sub-label"> {subLabelText}</span>
    </label>
);

export default FieldLabel;
