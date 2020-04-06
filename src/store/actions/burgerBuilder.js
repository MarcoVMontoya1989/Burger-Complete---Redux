import * as actionTypes from './actionsType';
import axios from '../../http/axios-order';

export const addIngredients = (name) => {
    return {
        ingredientName: name,
        type: actionTypes.ADD_INGREDIENTS
    }
};

export const removeIngredient = (name) => {
    return {
        ingredientName: name,
        type: actionTypes.REMOVE_INGREDIENTS
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get( '/ingredients.json' )
        .then( response => {
            dispatch(setIngredients(response.data));
        } )
        .catch( error => {
            dispatch(fetchIngredientsFailed());
        } );
    };
};
