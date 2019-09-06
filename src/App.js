import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CoreLayout from './components/CoreLayout/CoreLayout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
    constructor(props) {
        super(props);
        console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
        if (process.env.NODE_ENV !== 'production') {
            const { whyDidYouUpdate } = require('why-did-you-update');
            whyDidYouUpdate(React);
        }
    }

    render() {
        return (
            <div>
                <CoreLayout>
                    <Switch>
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/orders" component={Orders} />
                        <Route path="/" exact component={BurgerBuilder} />
                    </Switch>
                </CoreLayout>
            </div>
        );
    }
}

export default App;
