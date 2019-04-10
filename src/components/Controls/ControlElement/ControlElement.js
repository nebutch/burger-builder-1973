import React from 'react';
import classes from './ControlElement.css';

const controlElement = (props) => {
    return (
        <div className={classes.ControlElement}>
            <div className={classes.Label}>{props.label}</div>
            <button disabled={props.lessDisabled} onClick={props.removed} className={classes.Less}>
                Less
            </button>
            <button onClick={props.added} className={classes.More}>
                More
            </button>
        </div>
    );
};

export default controlElement;
