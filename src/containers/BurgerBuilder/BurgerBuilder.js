import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Burger from 'components/Burger/Burger';
import Controls from 'components/Controls/Controls';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';
import Spinner from 'components/UI/Spinner/Spinner';
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler';
import axios from 'axios-orders';
import * as actions from 'store/actions';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    componentDidMount() {
        this.props.initIngredients();
    }

    getPurchaseState = () => {
        const sum = Object.keys(this.props.ingredients)
            .map((key) => {
                return this.props.ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    };

    orderClickedHandler = () => {
        this.setState({ showModal: true });
    };

    backdropClickedHandler = () => {
        this.setState({ showModal: false });
    };

    continueClickedHandler = () => {
        this.props.purchaseInit();
        this.props.history.push('/checkout');
    };

    render() {
        const disabled = {
            ...this.props.ingredients
        };

        for (let key in disabled) {
            disabled[key] = disabled[key] <= 0;
        }

        let orderSummary = this.props.ingredients ? (
            <OrderSummary
                ingredients={this.props.ingredients}
                total={this.props.totalPrice}
                cancelClicked={this.backdropClickedHandler}
                continueClicked={this.continueClickedHandler}
            />
        ) : null;

        let burger = this.props.ingredients ? (
            <Fragment>
                <Burger ingredients={this.props.ingredients} />
                <Controls
                    total={this.props.totalPrice}
                    disabledInfo={disabled}
                    onAdd={this.props.addIngredient}
                    onRemove={this.props.removeIngredient}
                    purchasable={this.getPurchaseState()}
                    onOrderClicked={this.orderClickedHandler}
                />
            </Fragment>
        ) : !this.props.error ? (
            <Spinner />
        ) : (
            <p>
                Sorry, we cannot load the ingredients at this time. Please try
                later!
            </p>
        );

        return (
            <Fragment>
                <Modal
                    show={this.state.showModal}
                    backdropClicked={this.backdropClickedHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredient: (name) => dispatch(actions.addIngredient(name)),
        removeIngredient: (name) => dispatch(actions.removeIngredient(name)),
        initIngredients: () => dispatch(actions.initIngredients()),
        purchaseInit: () => dispatch(actions.purchaseInit())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
