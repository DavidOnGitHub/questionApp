import * as Type from './actionType';
import {log} from '../utils/debugUtils';

function toggleQuestionPopup(showQuestionPopup: boolean) {
    return {
        type: Type.TOGGLE_QUESTION_POPUP,
        showQuestionPopup
    };
}

function toggleLoginPopup(showLoginPopup: boolean) {
    return {
        type: Type.TOGGLE_LOGIN_POPUP,
        showLoginPopup
    };
}

export {toggleQuestionPopup, toggleLoginPopup};