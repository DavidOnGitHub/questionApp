import * as Type from '../actions/actionType';
import initialState from '../initialState';
import {log} from '../utils/debugUtils';

export default (state = initialState.display, action) => {
    switch (action.type) {
        case Type.TOGGLE_QUESTION_POPUP:
            return Object.assign({}, state, {
                showQuestionPopup: action.showQuestionPopup
            });
        case Type.TOGGLE_LOGIN_POPUP:
            return Object.assign({}, state, {
                showLoginPopup: action.showLoginPopup
            });
        default:
            return state;
    }
};