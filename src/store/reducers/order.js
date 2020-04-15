import * as actionTypes from '../actions/actionsType';
import {updateObject} from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    error: ''
};

const purchaseInit = (state, action) => {
  return updateObject(state, {
      purchased: false
  });
};

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, {
        loading: false,
    });
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    };

    return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    });
};

const purchaseBurgerFailed = (state, action) => {
    return updateObject(state, {
        loading: false
    });
};

//--------------------Fetch Orders

const fetchOrdersStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchOrdersSuccess = ( state, action ) => {
    return updateObject( state, {
        orders: action.orders,
        loading: false
    } );
};

const fetchOrdersFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart(state, actions);
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, actions);
        case actionTypes.PURCHASE_BURGER_FAILED:
            return purchaseBurgerFailed(state, actions);
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state, actions);
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStart(state, actions);
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess(state, actions);
        case actionTypes.FETCH_ORDERS_FAILED:
            return fetchOrdersFail(state, actions);
        default:
            return state;
    }
};

export default reducer;
