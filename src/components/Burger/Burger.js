import React from 'react';
import Ingredient from './Ingredient/Ingredient';

import classes from './Burger.css';

const burger = (props) => {
    const ingredientsArr = Object.keys(props.ingredients).map((igKey) => {
        return [...Array(props.ingredients[igKey])].map((_, idx) => {
            return <Ingredient type={igKey} key={igKey + idx} />;
        });
    });

    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top" />
            {ingredientsArr}
            <Ingredient type="bread-bottom" />
        </div>
    );
};

export default burger;
