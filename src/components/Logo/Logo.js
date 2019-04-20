import React from 'react';
import mainLogo from '../../assets/images/burger-logo.png';

import classes from './Logo.css';

const logo = (props) => {
    return (
        <div className={classes.Logo} style={{ height: props.height }}>
            <img src={mainLogo} alt="logo" />
        </div>
    );
};

export default logo;
