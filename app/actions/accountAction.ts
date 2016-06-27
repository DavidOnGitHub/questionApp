import * as Type from './actionType';
import {post, postWithAuth} from '../utils/httpUtils';
import {XError} from '../models/XError';
import {Troolean} from '../constants/Troolean';
import {log} from '../utils/debugUtils';
import {toggleLoginPopup} from './displayAction';

function signUpAccount(email) {
    return (dispatch) => {
        dispatch(requestSignUpAccount(email));
        return post('signUp', {email})
                .then(response => {
                    dispatch(signUpAccountSuccess());
                }, (error: XError) => {
                    dispatch(signUpAccountFail(error));
                });
    };
}

function requestSignUpAccount(email) {
    return {
        type: Type.SIGN_UP_ACCOUNT_REQUESTED
    };
}

function signUpAccountSuccess() {
    return {
        type: Type.SIGN_UP_ACCOUNT_SUCCESS
    };
}

function signUpAccountFail(error: XError) {
    return {
        type: Type.SIGN_UP_ACCOUNT_FAIL,
        error
    };
}

function registerAccount(accountDetails) {
    return (dispatch) => {
        dispatch(requestRegisterAccount(accountDetails));
        return post('register', accountDetails)
                .then(response => {
                    dispatch(registerAccountSuccess(accountDetails));
                    return Promise.resolve();
                }, (error: XError) => {
                    dispatch(registerAccountFail(error));
                    return Promise.reject(error);
                });
    };
}

function requestRegisterAccount(email) {
    return {
        type: Type.REGISTER_ACCOUNT_REQUESTED
    };
}

function registerAccountSuccess(accountDetails) {
    return {
        type: Type.REGISTER_ACCOUNT_SUCCESS,
        account: {
            email: accountDetails.email,
            username: accountDetails.username
        }
    };
}

function registerAccountFail(error: XError) {
    return {
        type: Type.REGISTER_ACCOUNT_FAIL,
        error
    };
}

function login(credentials: {accountName: string, password: string}) {
    return (dispatch) => {
        dispatch(loginRequested());
        return post('login', credentials)
                .then(response => {
                    dispatch(loginSuccess(response));
                    return Promise.resolve();
                }, (error: XError) => {
                    dispatch(loginFail(error));
                    return Promise.reject(error);
                });
    };
}

function loginRequested() {
    return {
        type: Type.LOGIN_REQUESTED
    };
}

function loginSuccess(account) {
    return {
        type: Type.LOGIN_SUCCESS,
        account
    };
}

function loginFail(error: XError) {
    return {
        type: Type.LOGIN_FAIL,
        error
    };
}

function logout() {
    return {
        type: Type.LOGOUT
    };
}

function loadCurrentUser() {
    return {
        type: Type.LOAD_CURRENT_USER
    };
}

function postWithAuthAction(url: string, body: Object) {
    return (dispatch) => {
        
        return postWithAuth(url, body)
                .catch((error: XError) => {
                    log('error', error);
                    if (error.isUnAuthorized) {
                        dispatch(logout());
                        dispatch(toggleLoginPopup(true));
                    }
                    return Promise.reject(error);
                });
    }
}


export {signUpAccount, registerAccount, login, logout, loadCurrentUser, postWithAuthAction};