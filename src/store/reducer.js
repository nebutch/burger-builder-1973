import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        lettuce: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
};

const PRICES = {
    lettuce: 0.5,
    bacon: 1,
    cheese: 1,
    meat: 2
};

const reducer = (state = initialState, action) => {
    const ingredient =
        action.payload && action.payload.name ? action.payload.name : '';
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                totalPrice: state.totalPrice + PRICES[ingredient],
                ingredients: {
                    ...state.ingredients,
                    [ingredient]: getNewValue(state, ingredient, action.type)
                }
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                totalPrice: state.totalPrice - PRICES[ingredient],
                ingredients: {
                    ...state.ingredients,
                    [ingredient]: getNewValue(state, ingredient, action.type)
                }
            };
        default:
            return state;
    }
};

const getNewValue = (state, ingredient, action) => {
    const sum = (a, b) => {
        return a + b;
    };

    const diff = (a, b) => {
        return a - b;
    };

    const count = state.ingredients[ingredient];
    let updated =
        action === actionTypes.ADD_INGREDIENT ? sum(count, 1) : diff(count, 1);

    if (updated < 0) {
        updated = 0;
    }

    return updated;
};

export default reducer;
