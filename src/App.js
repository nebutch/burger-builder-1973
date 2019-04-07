import React, { Component } from 'react';
import CoreLayout from './components/CoreLayout/CoreLayout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

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
                    <BurgerBuilder />
                </CoreLayout>
            </div>
        );
    }
}

export default App;
