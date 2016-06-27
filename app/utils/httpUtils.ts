import config from '../config';
import fetch from 'isomorphic-fetch';
import {IXError, XError, XErrorType} from '../models/XError';
import {log} from '../utils/debugUtils';

class HttpActionBuilder {
    options: Object
    headers: {[index: string]: string} = {}
    isInvalid: boolean = false
    inValidType: number = 0
    constructor(method: string, body?: Object) {
        this.options = {method};
        if (body) {
            Object.assign(this.options, {
                body: JSON.stringify(body)
            });
        }
    }

    withJson(): HttpActionBuilder {
        Object.assign(this.headers, {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        return this;
    }

    withAuth(): HttpActionBuilder {
        const currentUser = localStorage.getItem('questionApp_user');
        if (!currentUser) {
            this.isInvalid = true;
            this.inValidType = XErrorType.UNAUTHORIZED
            return this;
        }
        Object.assign(this.headers, {
            Authorization: `Bearer ${JSON.parse(currentUser).token}`
        });
        return this;
    }

    build(): (url: string, body?: Object) => Promise<any> {
        return (url: string) => {
            return send(url, this);
        }
    }
}

function get(url: string): Promise<any> {
    return new HttpActionBuilder('GET').withJson().build()(url);
}
function getWithAuth(url: string): Promise<any> {
    return new HttpActionBuilder('GET').withJson().withAuth().build()(url);
}
function post(url: string, body: Object): Promise<any> {
    return new HttpActionBuilder('POST', body).withJson().build()(url);
}
function postWithAuth(url: string, body: Object): Promise<any> {
    return new HttpActionBuilder('POST', body).withJson().withAuth().build()(url);
}

function send(url: string, action: HttpActionBuilder): Promise<any> {
    if (action.isInvalid) {
        return Promise.reject(action.inValidType);
    }

    const settings = Object.assign({
        headers: action.headers
    }, action.options);
    return fetch(`${config.apiUrl}${url}`, settings)
        .then((response) => {
            return response.json().then((data) => {
                if (response.status >= 400) {
                    throw new XError(data.type, data.message);
                }
                return data;
            });
        });
}

export {get, post, getWithAuth, postWithAuth};