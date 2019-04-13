import React, { Fragment } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';

class Modal extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    render() {
        const { props } = this;

        return (
            <Fragment>
                <Backdrop show={props.show} clicked={props.backdropClicked} />
                <div className={props.show ? classes.Show : classes.Hide}>
                    {props.children}
                </div>
            </Fragment>
        );
    }
}

export default Modal;
