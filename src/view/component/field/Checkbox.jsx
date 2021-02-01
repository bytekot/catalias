import React from 'react';
import BaseField from './Base.jsx';

const CheckboxField = ({ ...rest }) => (
    <BaseField
        type="checkbox"
        labelPosition="after"
        {...rest}
    />
);

export default CheckboxField;
