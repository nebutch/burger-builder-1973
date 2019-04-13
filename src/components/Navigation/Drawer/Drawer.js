import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Drawer.css';

const drawer = (props) => {
    let activeClasses = [classes.Drawer, classes.Close];
    if (props.open) {
        activeClasses[1] = classes.Open;
    }

    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.drawerClosed} />
            <div className={activeClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
    );
};

export default drawer;
