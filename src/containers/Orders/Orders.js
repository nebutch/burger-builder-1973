import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class Orders extends Component {
    state = {
        orders: {},
        loading: true
    };

    componentWillMount() {
        axios
            .get('/orders.json')
            .then((result) => {
                this.setState({ orders: result.data, loading: false });
            })
            .catch((err) => {
                console.error('Could not load orders', err.message);
                this.setState({ loading: false });
            });
    }

    render() {
        const data = this.state.orders;
        const orders = [];
        for (const key in data) {
            const element = (
                <Order
                    ingredients={data[key].ingredients}
                    price={data[key].price}
                    key={key}
                />
            );
            orders.push(element);
        }
        return <div>{this.state.loading ? <Spinner /> : orders}</div>;
    }
}

export default withErrorHandler(Orders, axios);
