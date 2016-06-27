import {IQuestion} from '../models/Question';
import {get} from '../utils/httpUtils';
import * as Type from './actionType';
import {IXError, XError} from '../models/XError';
import {logout, postWithAuthAction} from './accountAction';
import {log} from '../utils/debugUtils';

function requestFetchQuestion() {
    return {
        type: Type.REQUEST_FETCH_QUESTION
    }
}

function receiveFetchQuestion(response) {
    return {
        type: Type.RECEIVE_FETCH_QUESTION,
        response
    }
}

function fetchQuestion() {
    return (dispatch) => {
        dispatch(requestFetchQuestion());
        return get('question')
            .then((response) => dispatch(receiveFetchQuestion(response)));
    }
}

function requestAddQuestion(question) {
    return {
        type: Type.REQUEST_ADD_QUESTION,
        question
    }
}

function receiveAddQuestion(response) {
    return {
        type: Type.RECEIVE_ADD_QUESTION,
        response
    }
}

function addQuestion(question: IQuestion) {
    return (dispatch) => {
        dispatch(requestAddQuestion(question));
        return dispatch(postWithAuthAction('question', question))
                .then(response => dispatch(receiveAddQuestion(response)));
    }
};

function selectQuestion(questionId: string) {
    return {
        type: Type.SELECT_QUESTION,
        questionId
    };
}

function hoverOverQuestion(questionId: string) {
    return {
        type: Type.HOVER_OVER_QUESTION,
        questionId
    };
}

function setIsAddingQuestion(isAddingQuestion: boolean) {
    return {
        type: Type.TOGGLE_IS_ADDING_QUESTION,
        isAddingQuestion
    };
}

function setQuestionToView(question: IQuestion) {
    return {
        type: Type.SET_QUESTION_TO_VIEW,
        question
    };
}

export {addQuestion,
        fetchQuestion,
        selectQuestion,
        hoverOverQuestion,
        setIsAddingQuestion,
        setQuestionToView};