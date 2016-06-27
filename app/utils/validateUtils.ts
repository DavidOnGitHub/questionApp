import {post} from './httpUtils';
import {IXError, XError, XErrorType} from '../models/XError';

const validateEmailFormat = (email: string) => {
    const emailPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return emailPattern.test(email);
}

const validateUsername = (username: string) => {
    const usernamePattern = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[\w.]*[0-9a-zA-Z]+$/;
    return usernamePattern.test(username);
}

const validatePassword = (password: string) => {
    const passwordPattern = /^(?=.{8,20}$)^\S+$/;
    return passwordPattern.test(password);
}

const checkAccountAvailability = (account: string) => {
    return post('checkAccount', {account})
            .then((response) => {
                return Promise.resolve(true);
            }, (error: IXError): Promise<any> => {
                if (error.type === XErrorType.UNAVAILABLE) {
                    return Promise.resolve(false);
                } else {
                    return Promise.reject(error.message);
                }
            });
}

export function required(value: string): boolean {
    return !!(value && value.trim());
};

export {validateEmailFormat, validateUsername, validatePassword, checkAccountAvailability};