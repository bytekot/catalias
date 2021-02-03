import React, { useState } from 'react';
import TeamNameField from '../field/TeamName.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'

const TeamsFieldset = ({ teamNames }) => {
    const [teamsNumber, setTeamsNumber] = useState(2);

    return (
        <fieldset>
            <legend>
                <FontAwesomeIcon icon={faUserFriends} />
                <span>Команды</span>
                <button
                    className="small"
                    onClick={() => setTeamsNumber(teamsNumber + 1)}
                >&#43; Добавить
                </button>
            </legend>
            {
                Array.from({ length: teamsNumber }, (_value, index) =>
                    <TeamNameField
                        teamId={index}
                        defaultValue={teamNames[index] || ''}
                        onBlur={(event) => teamNames[index] = event.target.value}
                    />
                )
            }
        </fieldset>
    );
};

export default TeamsFieldset;
