import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Please review your order!</h1>
            <div style={{ width: '100%', height: '300px', margin: 'auto' }}>
                <Burger {...props} />
            </div>
            <Button btnType="Danger" click={props.cancelClicked}>
                CANCEL
            </Button>
            <Button btnType="Success" click={props.continueClicked}>
                CONTINUE
            </Button>
        </div>
    );
};

export default checkoutSummary;
