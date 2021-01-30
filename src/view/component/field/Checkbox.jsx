import React from 'react';
import BaseField from './Base.jsx';

const CheckboxField = ({ ...rest }) => (
    <BaseField type="checkbox" {...rest} />
);

export default CheckboxField;
