import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCat } from '@fortawesome/free-solid-svg-icons'

const Header = ({ onClick }) => (
    <div class="header">
        <button onClick={onClick}>
            <FontAwesomeIcon
                icon={faCat}
                className="header-logo"
            />
            <span>Catalias</span>
        </button>
    </div>
);

export default Header;
