import React from 'react';
import BaseField from './Base.jsx';

const TextField = ({ className, ...rest }) => (
    <BaseField
        type="text"
        className={`textfield ${className}`}
        {...rest}
    />
);

export default TextField;
