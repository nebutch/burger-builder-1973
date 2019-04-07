import React, { Fragment } from 'react';
import classes from './CoreLayout.css';

const coreLayout = (props) => (
    <Fragment>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>{props.children}</main>
    </Fragment>
);

export default coreLayout;
