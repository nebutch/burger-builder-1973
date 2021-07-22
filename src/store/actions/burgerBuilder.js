import * as actionTypes from './actionTypes';
import axios from 'axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: { name }
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: { name }
    };
};

export const setIngredients = (ing) => {
    console.log('setIngredients ing: ', ing);
    return {
        type: actionTypes.SET_INGREDIENTS,
        payload: { ingredients: ing }
    };
};

export const fetchFailed = () => {
    return {
        type: actionTypes.FETCH_FAILED
    };
};

export const initIngredients = () => {
    console.log('init ingredients...');
    return (dispatch) => {
        axios
            .get('/ingredients.json')
            .then((response) => {
                dispatch(setIngredients(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(fetchFailed());
            });
    };
};
