import * as actionTypes from '../actions/actionsType';

const initialState = {
    orders: [],
    loading: false,
    error: ''
};

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true,
                purchased: false
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...actions.orderData,
                id: actions.orderId
            };

            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            };
        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading: false,
                error: actions.error
            };
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            };
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: actions.orders,
                loading: false
            };
        case actionTypes.FETCH_ORDERS_FAILED:
            return {
                ...state,
                error: actions.error,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;
