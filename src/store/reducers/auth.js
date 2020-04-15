import * as actionTypes from '../actions/actionsType';
import {updateObject} from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
};

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    })
};

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case actionTypes.AUTH_FAIL:
            return authFail(state, actions);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, actions);
        case actionTypes.AUTH_START:
            return authStart(state, actions);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, actions);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, actions);
        default:
            return state;
    }
};

export default reducer;