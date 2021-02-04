import React, { useState } from 'react';
import TeamNameField from '../field/TeamName.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faPlus } from '@fortawesome/free-solid-svg-icons'

const TeamsFieldset = ({ teamNames }) => {
    const [teamsNumber, setTeamsNumber] = useState(2);

    return (
        <fieldset>
            <legend>
                <FontAwesomeIcon icon={faUserFriends} />
                <span>Команды</span>
                <button
                    className="button small"
                    onClick={() => setTeamsNumber(teamsNumber + 1)}
                >
                    <FontAwesomeIcon
                        icon={faPlus}
                        className="icon-button"
                    />
                    <span>Добавить</span>
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
