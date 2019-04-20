import React from 'react';
import Ingredient from './Ingredient/Ingredient';

import classes from './Burger.css';

const burger = (props) => {
    const message = <p>Please start adding ingredients</p>;
    const ingredientsArr = Object.keys(props.ingredients)
        .map((igKey) => {
            return [...Array(props.ingredients[igKey])].map((_, idx) => {
                return <Ingredient type={igKey} key={igKey + idx} />;
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top" />
            {ingredientsArr.length > 0 ? ingredientsArr : message}
            <Ingredient type="bread-bottom" />
        </div>
    );
};

export default burger;
