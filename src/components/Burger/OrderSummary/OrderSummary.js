import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';
import constants from '../../../constants';
import classes from './OrderSummary.css';

class OrderSummary extends React.Component {
    render() {
        const { props } = this;

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
                <p>
                    This is the order summary. Your total is{' '}
                    <strong>{price}</strong>
                </p>
                <p>Continue to checkout?</p>
                <Button click={props.cancelClicked} btnType={constants.DANGER}>
                    CANCEL
                </Button>
                <Button
                    click={props.continueClicked}
                    btnType={constants.SUCCESS}
                >
                    CONTINUE
                </Button>
            </Fragment>
        );
    }
}

export default OrderSummary;
