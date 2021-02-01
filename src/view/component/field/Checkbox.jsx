import React from 'react';
import BaseField from './Base.jsx';

const CheckboxField = ({ ...rest }) => (
    <BaseField
        type="checkbox"
        className="checkbox"
        labelPosition="after"
        {...rest}
    />
);

export default CheckboxField;
