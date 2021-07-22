import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
// import { purchaseInit } from 'store/actions';

class Checkout extends Component {
    componentDidMount = () => {
        // this.props.purchaseInit();
    };

    continueClickedHandler = () => {
        console.log('clicked continue');
        this.props.history.replace('/checkout/contact-data');
    };

    cancelClickedHandler = () => {
        console.log('clicked cancel');
        this.props.history.goBack();
    };

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? (
                <Redirect to="/" />
            ) : null;
            summary = (
                <div>
                    {purchasedRedirect}
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
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);
