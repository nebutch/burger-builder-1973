import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Controls/Controls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const PRICES = {
    lettuce: 0.5,
    bacon: 1,
    cheese: 1,
    meat: 2
};

const ACTIONS = {
    add: 'add',
    remove: 'remove'
};
class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                lettuce: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            purchasable: false,
            showModal: false
        };
    }

    updatePurchaseState = (ingredients) => {
        // const ingredients = { ...this.state.ingredients };
        const sum = Object.keys(ingredients)
            .map((key) => {
                return ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        console.log('Sum of ingredients : ', sum);
        // return sum > 0;
        this.setState({
            purchasable: sum > 0
        });
    };

    addIngredientHandler = (type) => {
        this.adjustIngredient(type, ACTIONS.add);
    };

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <= 0) {
            return;
        }
        this.adjustIngredient(type, ACTIONS.remove);
    };

    adjustIngredient = (type, action) => {
        const sum = (a, b) => {
            return a + b;
        };

        const diff = (a, b) => {
            return a - b;
        };

        const count = this.state.ingredients[type];
        const updated = action === ACTIONS.add ? sum(count, 1) : diff(count, 1);
        const ing = { ...this.state.ingredients };
        ing[type] = updated;

        const prAdd = PRICES[type];
        const cTotal = this.state.totalPrice;
        const newTotal =
            action === ACTIONS.add ? sum(cTotal, prAdd) : diff(cTotal, prAdd);

        // const purchasable = this.updatePurchaseState(ing);

        this.setState({
            ingredients: ing,
            totalPrice: newTotal
        });

        this.updatePurchaseState(ing);
    };

    orderClickedHandler = () => {
        this.setState({ showModal: true });
    };

    render() {
        const disabled = {
            ...this.state.ingredients
        };

        for (let key in disabled) {
            disabled[key] = disabled[key] <= 0;
        }
        return (
            <Fragment>
                {this.state.showModal && (
                    <Modal>
                        <OrderSummary
                            ingredients={this.state.ingredients}
                            total={this.state.totalPrice}
                        />
                    </Modal>
                )}
                <Burger ingredients={this.state.ingredients} />
                <Controls
                    total={this.state.totalPrice}
                    disabledInfo={disabled}
                    onAdd={this.addIngredientHandler}
                    onRemove={this.removeIngredientHandler}
                    purchasable={this.state.purchasable}
                    onOrderClicked={this.orderClickedHandler}
                />
            </Fragment>
        );
    }
}

export default BurgerBuilder;
