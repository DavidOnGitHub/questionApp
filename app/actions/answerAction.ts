
import {IAnswer} from '../models/Answer';
import {get} from '../utils/httpUtils';
import * as Type from './actionType';
import {XError} from '../models/XError';
import {logout, postWithAuthAction} from './accountAction';
import {log} from '../utils/debugUtils';

function requestFetchAnswer() {
    return {
        type: Type.REQUEST_FETCH_ANSWER
    }
}

function receiveFetchAnswer(response) {
    return {
        type: Type.RECEIVE_FETCH_ANSWER,
        response
    }
}

function fetchAnswers(questionId) {
    return (dispatch) => {
        dispatch(requestFetchAnswer());
        return get(`question/${questionId}/answer`)
                .then((response) => dispatch(receiveFetchAnswer(response)));
    };
}

function requestAddAnswer(answer) {
    return {
        type: Type.REQUEST_ADD_ANSWER,
        answer
    }
}

function receiveAddAnswer(response) {
    return {
        type: Type.RECEIVE_ADD_ANSWER,
        response
    }
}

const addAnswer = (answer: IAnswer) => {
    // const answerToSend = Object.assign({}, answer, {
    //     questionId: answer.questionId,
    //     content: answer.content,
    //     accountId: answer.accountId
    // });
    return (dispatch) => {
        dispatch(requestAddAnswer(answer));
        return dispatch(postWithAuthAction('answer', answer))
               .then((response) => {
                   dispatch(receiveAddAnswer(response))
               }, () => {
                   //logout and show login popup is handled in postWithAuthAction already
               });
    };
};
export {addAnswer, fetchAnswers};