import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCat } from '@fortawesome/free-solid-svg-icons'

const Header = () => (
    <div class="header">
        <FontAwesomeIcon
            icon={faCat}
            className="header-logo"
        />
        <span>Catalias</span>
    </div>
);

export default Header;
