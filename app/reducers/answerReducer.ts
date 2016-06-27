import * as Action from '../actions/answerAction';
import {Answer, IAnswer} from '../models/Answer';
import * as Type from '../actions/actionType';

function transformResponseToAnswer(response): IAnswer {
    const {accountId, content, location, createdTime, metadata} = response;
    const answer = new Answer(response.questionId);
    
    answer.id = response._id;
    Object.assign(answer, {accountId, content, location, metadata}, {
        createdTime: new Date(createdTime)
    });
    return answer;
}

function transformResponseToAnswers(response): Array<IAnswer> {
    return response.map((result) => transformResponseToAnswer(result));
}
const answer = (state = {
        isFetching: false,
        answers: []
    }, action) => {
        switch(action.type) {
            case Type.REQUEST_ADD_ANSWER:
                return Object.assign({}, state, {
                    isFetching: true
                });
            case Type.RECEIVE_ADD_ANSWER:
                return Object.assign({}, state, {
                    answers: [...state.answers, transformResponseToAnswer(action.response)],
                    isFetching: false,
                    answerToAddContent: null
                });
            case Type.REQUEST_FETCH_ANSWER:
                return Object.assign({}, state, {
                    isFetching: true
                });
            case Type.RECEIVE_FETCH_ANSWER:
                return Object.assign({}, state, {
                    answers: transformResponseToAnswers(action.response),
                    isFetching: false
                });
            default: 
                return state;    
        }
};

export default answer;