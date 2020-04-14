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
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userId');
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

export const authCheckState = () => {
  return dispatch => {
      const token = localStorage.getItem('token');

      if (!token) {
          dispatch(logout());
      } else {
          const expiresIn = new Date(localStorage.getItem('expiresIn'));
          if (expiresIn <= new Date()) {
              dispatch(logout());
          } else {
              const userId = localStorage.getItem('userId');
              dispatch(authSuccess(token, userId));
              dispatch(checkAuthTimeout (
                      (expiresIn.getTime() - new Date().getTime()) / 1000
                  ));
          }
      }
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
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn + 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expiresIn', expirationDate);
                localStorage.setItem('userId', res.data.localId);

                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            }
        ).catch(err => {
            dispatch(authFail(err.response.data.error));
        });
    };
};
