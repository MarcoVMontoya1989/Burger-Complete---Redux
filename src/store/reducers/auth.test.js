import reducer from "./auth";
import * as actionTypes from '../actions/actionsType';

describe('auth reducer', () => {
    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
        });
    });

    it('should store the token upon login', function () {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
        }, {
            type: actionTypes.AUTH_SUCCESS,
            token: 'foobarABCD-XYZ',
            userId: 'userIdXYZ-ABCD'
        })).toEqual({
            token: 'foobarABCD-XYZ',
            userId: 'userIdXYZ-ABCD',
            error: null,
            loading: false,
            authRedirectPath: '/',
        })
    });
});