import React from 'react';
//import Button from '../../../UI/Button/Button';
//import Logo from '../../../Logo/Logo';
import classes from './DrawerToggle.css';

const drawerToggle = (props) => {
    return (
        <div onClick={props.toggleClicked} className={classes.DrawerToggle}>
            <div />
            <div />
            <div />
        </div>
    );
};

export default drawerToggle;
