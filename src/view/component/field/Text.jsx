import React from 'react';
import BaseField from './Base.jsx';

const TextField = ({ ...rest }) => (
    <BaseField type="text" className="textfield" {...rest} />
);

export default TextField;
