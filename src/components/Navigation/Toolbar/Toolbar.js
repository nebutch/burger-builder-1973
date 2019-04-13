import React from 'react';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../Drawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.css';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle toggleClicked={props.drawerToggled} />

            <div className={classes.Logo}>
                <Logo />
            </div>

            <nav>
                <NavigationItems />
            </nav>
        </header>
    );
};

export default toolbar;
