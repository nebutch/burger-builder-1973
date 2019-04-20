import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Controls/Controls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

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
            showModal: false,
            loading: false
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

    backdropClickedHandler = () => {
        this.setState({ showModal: false });
    };

    continueClickedHandler = () => {
        // alert('Continue order...');
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Nolan Butcher',
                email: 'nolan@website.com',
                address: {
                    street: '1234 Main Street',
                    city: 'Centerville',
                    zip: '10001'
                }
            },
            deliveryMethod: 'ground'
        };
        axios
            .post('/orders.json', order)
            .then((response) => {
                console.log('order submitted:\n', response);
                this.setState({ loading: false, showModal: false });
            })
            .catch((error) => {
                console.error('Problem sending order:\n', error);
                this.setState({ loading: false, showModal: false });
            });
    };

    render() {
        const disabled = {
            ...this.state.ingredients
        };

        for (let key in disabled) {
            disabled[key] = disabled[key] <= 0;
        }

        let orderSummary = (
            <OrderSummary
                ingredients={this.state.ingredients}
                total={this.state.totalPrice}
                cancelClicked={this.backdropClickedHandler}
                continueClicked={this.continueClickedHandler}
            />
        );
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Fragment>
                <Modal
                    show={this.state.showModal}
                    backdropClicked={this.backdropClickedHandler}
                >
                    {orderSummary}
                </Modal>
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
