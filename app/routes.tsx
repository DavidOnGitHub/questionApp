import * as React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import QuestionListPreview from './components/QuestionListPreview';
import Registration from './components/Registration';

export default (
    <Route path='/' component={App}>
        <IndexRoute component={QuestionListPreview} />
        <Route path='password' component={Registration} />
    </Route>
);