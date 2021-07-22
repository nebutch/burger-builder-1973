import * as actionTypes from 'store/actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
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
    console.log('action : ', action);
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
        case actionTypes.SET_INGREDIENTS:
            const ings = action.payload.ingredients;
            return {
                ...state,
                error: false,
                ingredients: {
                    lettuce: ings.lettuce,
                    bacon: ings.bacon,
                    cheese: ings.cheese,
                    meat: ings.meat
                },
                totalPrice: initialState.totalPrice
            };
        case actionTypes.FETCH_FAILED:
            return {
                ...state,
                error: true
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
