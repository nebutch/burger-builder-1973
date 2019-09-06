import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Burger from 'components/Burger/Burger';
import Controls from 'components/Controls/Controls';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';
import Spinner from 'components/UI/Spinner/Spinner';
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler';
import axios from 'axios-orders';
import * as actionTypes from 'store/actions';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            loading: false,
            error: false
        };
    }

    componentDidMount() {
        axios
            .get('/ingredients.json')
            .then((response) => {
                //this.setState({ ingredients: response.data });
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
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
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

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
        ) : !this.state.error ? (
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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredient: (name) =>
            dispatch({
                type: actionTypes.ADD_INGREDIENT,
                payload: { name: name }
            }),
        removeIngredient: (name) =>
            dispatch({
                type: actionTypes.REMOVE_INGREDIENT,
                payload: { name: name }
            })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
