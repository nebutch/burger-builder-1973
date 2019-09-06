import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    /* state = {
        ingredients: null,
        totalPrice: 0
    }; */

    /* componentWillMount() {
        const params = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (const p of params.keys()) {
            const v = params.get(p);
            if (p === 'price') {
                price = +v;
            } else {
                ingredients[p] = +v;
            }
        }

        this.setState({
            ingredients: ingredients,
            totalPrice: price
        });
    } */

    continueClickedHandler = () => {
        console.log('clicked continue');
        this.props.history.replace('/checkout/contact-data');
    };

    cancelClickedHandler = () => {
        console.log('clicked cancel');
        this.props.history.goBack();
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    continueClicked={this.continueClickedHandler}
                    cancelClicked={this.cancelClickedHandler}
                />
                <Route
                    path={`${this.props.match.url}/contact-data`}
                    component={ContactData}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients
    };
};

export default connect(mapStateToProps)(Checkout);
