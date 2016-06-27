import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import App from './app/components/App';
import reducer from './app/reducers';
import routes from './app/routes';

let store = createStore(
    reducer,
    applyMiddleware(thunk)
);
render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('app')
);
