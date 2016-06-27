import {combineReducers} from 'redux';
import question from './questionReducer';
import answer from './answerReducer';
import tag from './tagReducer';
import account from './accountReducer';
import form from './formReducer';
import display from './displayReducer';

const reducer = combineReducers({
    question,
    answer,
    tag,
    account,
    form,
    display
});

export default reducer;