import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    /* state = {
        ingredients: ['bread-top', 'cheese', 'meat', 'bread-bottom']
    }; */
    state = {
        ingredients: {
            lettuce: 1,
            bacon: 1,
            cheese: 1,
            meat: 2
        }
    };

    render() {
        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients} />
                <div>Controls</div>
            </Fragment>
        );
    }
}

export default BurgerBuilder;
