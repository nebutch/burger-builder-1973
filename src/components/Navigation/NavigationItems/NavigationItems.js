import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import constants from '../../../constants';
import classes from './NavigationItems.css';

const navigationItems = (props) => {
    const items = Object.keys(constants.navigation).map((key) => {
        return (
            <NavigationItem key={key} link="/" active={false}>
                {constants.navigation[key]}
            </NavigationItem>
        );
    });
    return <ul className={classes.NavigationItems}>{items}</ul>;
};

export default navigationItems;
