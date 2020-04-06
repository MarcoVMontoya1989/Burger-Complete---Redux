import * as actionTypes from '../actions/actionsType';
import * as IngPrice from '../../containers/Base/GlobalValues';

const initialState = {
    ingredients: null,
    price: 4.00,
    error: false
};

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [actions.ingredientName]: state.ingredients[actions.ingredientName] + 1,
                },
                price: state.price + IngPrice[actions.ingredientName],
            };
        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [actions.ingredientName]: state.ingredients[actions.ingredientName] - 1,
                },
                price: state.price - IngPrice[actions.ingredientName]
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: actions.ingredients.salad,
                    bacon: actions.ingredients.bacon,
                    cheese: actions.ingredients.cheese,
                    meat: actions.ingredients.meat
                },
                price: 4.00,
                error: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;
