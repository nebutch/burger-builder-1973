import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case 'select':
            const options = props.elementConfig.options.map((item) => {
                return (
                    <option key={item.value} value={item.value}>
                        {item.display}
                    </option>
                );
            });
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    defaultValue={props.elementConfig.defaultValue}
                    onChange={props.changed}
                >
                    {options}
                </select>
            );
            break;
        case 'textarea':
            inputElement = (
                <textarea
                    className={inputClasses.join(' ')}
                    value={props.value}
                    {...props.elementConfig}
                    onChange={props.changed}
                />
            );
            break;
        case 'input':
        default:
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    value={props.value}
                    {...props.elementConfig}
                    onChange={props.changed}
                />
            );
            break;
    }

    return (
        <div className={classes.Input}>
            {/* <label className={classes.Label}>{props.label}</label> */}
            {inputElement}
        </div>
    );
};

export default input;
