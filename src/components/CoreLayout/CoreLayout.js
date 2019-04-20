import React, { Fragment } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Drawer from '../Navigation/Drawer/Drawer';
import classes from './CoreLayout.css';

class CoreLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            drawerOpen: false
        };
    }

    drawerClosedHandler = (evt) => {
        console.log('drawer closed');
        this.setState({ drawerOpen: false });
    };

    drawerToggleHandler = () => {
        console.log('drawer opened');
        this.setState((prevState) => {
            return { drawerOpen: !prevState.drawerOpen };
        });
    };

    render() {
        return (
            <Fragment>
                <div>
                    <Toolbar drawerToggled={this.drawerToggleHandler} />
                    <Drawer
                        drawerClosed={this.drawerClosedHandler}
                        open={this.state.drawerOpen}
                    />
                </div>
                <main className={classes.Content}>{this.props.children}</main>
            </Fragment>
        );
    }
}

export default CoreLayout;
