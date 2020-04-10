import * as actionTypes from './actionsType';
import axios from 'axios';
import * as fire from '../../http/proxy';

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
};

export const authFail = (error) => {
    console.log(error);
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = fire.signUPNewUser;

        if (!isSignUp) {
            url = fire.signInExistUser;
        }

        axios.post(url, authData).then(
            res => {
                console.log('res',res);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            }
        ).catch(err => {
            dispatch(authFail(err.response.data.error));
        });
    };
};
