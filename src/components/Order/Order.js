import React from 'react';
import classes from './Order.css';

const order = (props) => {
    console.log('[Order]');
    console.log('ingredients : ', props.ingredients);
    console.log('price : ', props.price);
    const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(props.price);

    const ingredients = [];

    for (const key in props.ingredients) {
        if (props.ingredients[key] > 0) {
            ingredients.push(
                <span
                    style={{
                        textTransform: 'capitalize',
                        margin: '0 8px',
                        display: 'inline-block',
                        border: '1px solid #ccc',
                        padding: '5px'
                    }}
                    key={key}
                >{`${key} (${props.ingredients[key]})`}</span>
            );
        }
    }
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>
                Total Price: <strong>{price}</strong>
            </p>
        </div>
    );
};

export default order;
