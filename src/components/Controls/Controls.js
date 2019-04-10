import React from 'react';
import ControlElement from './ControlElement/ControlElement';
import classes from './Controls.css';

const controlElements = [
    { label: 'Lettuce', type: 'lettuce' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' }
];

const controls = (props) => {
    const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(props.total);
    return (
        <div className={classes.Controls}>
            <p>Current total: {price}</p>
            {controlElements.map((element) => {
                return (
                    <ControlElement
                        added={() => props.onAdd(element.type)}
                        removed={() => props.onRemove(element.type)}
                        lessDisabled={props.disabledInfo[element.type]}
                        label={element.label}
                        key={element.type}
                    />
                );
            })}
            <button onClick={props.onOrderClicked} disabled={!props.purchasable} className={classes.OrderButton}>ORDER NOW</button>
        </div>
    );
};

export default controls;
