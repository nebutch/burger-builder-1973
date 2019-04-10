import React, { Fragment } from 'react';

const orderSummary = (props) => {
    const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(props.total);
    const ingredients = Object.keys(props.ingredients).map((key) => {
        return (
            <li>
                {key}:{props.ingredients[key]}
            </li>
        );
    });
    return (
        <Fragment>
            <h3>Order Summary</h3>
            <p>A delish burger with these ingredients:</p>
            <ul>{ingredients}</ul>
            <p>This is the order summary. Your total is {price}</p>
        </Fragment>
    );
};

export default orderSummary;
