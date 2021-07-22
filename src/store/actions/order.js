import * as actionTypes from 'store/actions/actionTypes';
import axios from 'axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        payload: { orderId, orderData }
    };
};

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_FAILED,
        payload: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_START
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const sendOrder = (orderData) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios
            .post('/orders.json', orderData)
            .then((response) => {
                console.log('initPurchase response : ', response);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch((error) => {
                dispatch(purchaseBurgerFailed(error));
            });
    };
};
