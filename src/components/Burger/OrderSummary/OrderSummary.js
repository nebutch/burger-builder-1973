import React, { Fragment } from 'react';
import classes from './OrderSummary.css';

const orderSummary = (props) => {
    const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(props.total);
    const ingredients = Object.keys(props.ingredients).map((key) => {
        return (
            <li key={key} className={classes.OrderSummary}>
                <span>{key}</span>:{props.ingredients[key]}
            </li>
        );
    });
    return (
        <Fragment>
            <h3>Order Summary</h3>
            <p>A delish burger with these ingredients:</p>
            <ul>{ingredients}</ul>
            <p>This is the order summary. Your total is {price}</p>
            <p>Continue to checkout?</p>
        </Fragment>
    );
};

export default orderSummary;
