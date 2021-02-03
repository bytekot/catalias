import React from 'react';
import TextField from './Text.jsx';

const TeamNameField = ({ teamId, ...rest }) => (
    <TextField
        name={teamId}
        label={`Команда ${teamId + 1}`}
        {...rest}
    />
);

export default TeamNameField;
