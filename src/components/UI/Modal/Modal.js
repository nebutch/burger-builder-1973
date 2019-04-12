import React, { Fragment } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';

const modal = (props) => {
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.backdropClicked}/>
            <div className={props.show ? classes.Show : classes.Hide}>
                {props.children}
            </div>
        </Fragment>
    );
};

export default modal;
