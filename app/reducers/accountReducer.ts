import * as Type from '../actions/actionType';
import {Troolean} from '../constants/Troolean';
import {log} from '../utils/debugUtils';

const account = (state = {}, action) => {
    switch(action.type) {
        case Type.LOAD_CURRENT_USER:
            const currentAccount = localStorage.getItem('questionApp_user');
            return Object.assign({}, state, {
                currentAccount: JSON.parse(currentAccount)
            });
        case Type.SIGN_UP_ACCOUNT_REQUESTED:
            return Object.assign({}, state, {
                isSignUpFetching: true
            });
        case Type.SIGN_UP_ACCOUNT_SUCCESS:
            return Object.assign({}, state, {
                isSignUpFetching: false
            });
        case Type.SIGN_UP_ACCOUNT_FAIL:
            return Object.assign({}, state, {
                isSignUpFetching: false
            });
        case Type.REGISTER_ACCOUNT_REQUESTED:
            return Object.assign({}, state, {
                isRegisterFetching: true
            });
        case Type.REGISTER_ACCOUNT_SUCCESS:
            return Object.assign({}, state, {
                currentAccount: action.account,
                isRegisterFetching: false
            });
        case Type.REGISTER_ACCOUNT_FAIL:
            return Object.assign({}, state, {
                isRegisterFetching: false
            });
        case Type.LOGIN_REQUESTED:
            return Object.assign({}, state, {
                isLoginFetching: true
            });
        case Type.LOGIN_SUCCESS:
            localStorage.setItem('questionApp_user', JSON.stringify(action.account))
            return Object.assign({}, state, {
                currentAccount: action.account,
                isLoginFetching: false
            });
        case Type.LOGIN_FAIL:
            return Object.assign({}, state, {
                isLoginFetching: false
            });
        case Type.LOGOUT:
            localStorage.removeItem('questionApp_user'); 
            return Object.assign({}, state, {
                currentAccount: null
            });
        default:
            return state;
    }
}

export default account;