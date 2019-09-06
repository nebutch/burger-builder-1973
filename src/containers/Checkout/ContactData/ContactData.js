import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import formElements from '../../../config/form-elements';

import axios from '../../../axios-orders';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        orderForm: null,
        loading: false,
        defaultDelivery: null,
        formIsValid: false
    };

    componentWillMount() {
        console.log('component mounted');
        axios
            .get('config.json')
            .then((result) => {
                this.setState({
                    orderForm: { ...formElements },
                    defaultDelivery: result.data.contactform.defaultDelivery
                });
            })
            .catch((error) => {
                console.error('Problem getting config:\n', error);
                this.setState({ loading: false });
            });
    }

    checkValidation = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    };

    orderClickedHandler = (evt) => {
        evt.preventDefault();
        this.setState({ loading: true });

        const formData = {};
        for (const key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            contactData: formData
        };

        axios
            .post('/orders.json', order)
            .then((response) => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch((error) => {
                console.error('Problem sending order:\n', error);
                this.setState({ loading: false });
            });
    };

    inputChangedHandler = (evt, key) => {
        console.log('input on change fired');
        console.log(evt.target.value);
        console.log(key);

        const updatedOrderForm = { ...this.state.orderForm };
        const updatedElement = { ...updatedOrderForm[key] };

        updatedElement.touched = true;
        updatedElement.value = evt.target.value;
        if (updatedElement.elementType !== 'select') {
            updatedElement.valid = this.checkValidation(
                updatedElement.value,
                updatedElement.validation
            );
            console.log(`${key} is valid : ${updatedElement.valid}`);
        }

        updatedOrderForm[key] = updatedElement;

        let formIsValid = true;
        for (const formKey in updatedOrderForm) {
            let valid = updatedOrderForm[formKey].valid || false;
            console.log('type:', updatedOrderForm[formKey].elementType);
            if (updatedOrderForm[formKey].elementType === 'select') {
                valid = true;
            }

            formIsValid = valid && formIsValid;
        }

        console.log('formIsValid : ', formIsValid);

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        });
    };

    createFormElements = () => {
        const formArr = [];
        for (const key in this.state.orderForm) {
            const item = this.state.orderForm[key];
            if (item.elementType === 'select') {
                const defaultValue = this.state.defaultDelivery
                    ? this.state.defaultDelivery
                    : item.config.defaultValue;
                item.config.defaultValue = defaultValue;
            }

            formArr.push(
                <Input
                    elementType={item.elementType}
                    elementConfig={item.config}
                    value={item.value}
                    label={item.label}
                    invalid={!item.valid}
                    shouldValidate={!!item.validation}
                    touched={item.touched}
                    key={key}
                    changed={(evt) => this.inputChangedHandler(evt, key)}
                />
            );
        }

        return formArr;
    };

    render() {
        let form = (
            <form onSubmit={this.orderClickedHandler}>
                {this.createFormElements()}
                <Button btnType="Success" disabled={!this.state.formIsValid}>
                    ORDER
                </Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
};

export default connect(mapStateToProps)(ContactData);
