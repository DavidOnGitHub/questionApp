import {IQuestion, Question} from '../models/Question';
import * as Action from '../actions/questionAction';
import * as Type from '../actions/actionType';
import initialState from '../initialState';
import {contains} from '../utils/collectionUtils';

function transformResponseToQuestion(response): IQuestion {
    const question = new Question();
    question.title = response.title;
    question.content = response.content;
    question.id = response._id;
    question.accountId = response.accountId;
    question.tags = response.tags;
    
    return question;
}

function transformResponseToQuestions(response): Array<IQuestion> {
    return response.map((question) => (transformResponseToQuestion(question)));
}
const question = (state = initialState.question, action) => {
    switch(action.type) {
        case Type.REQUEST_ADD_QUESTION:
            return Object.assign({}, state, {
                isAddQuestionRequesting: true
            });
        case Type.RECEIVE_ADD_QUESTION:
            const newQuestion = transformResponseToQuestion(action.response);
            return Object.assign({}, state, {
                    questions: [...state.questions, newQuestion],
                    isAddQuestionRequesting: false
                });
        case Type.REQUEST_FETCH_QUESTION:
            return Object.assign({}, state, {
                isFetchQuestionRequesting: true
            });
        case Type.RECEIVE_FETCH_QUESTION:
            return Object.assign({}, state, {
                questions: transformResponseToQuestions(action.response),
                isFetchQuestionRequesting: false
            });
        case Type.SELECT_QUESTION:
            return Object.assign({}, state, {
                selectedQuestionId: action.questionId
            });
        case Type.HOVER_OVER_QUESTION:
            return Object.assign({}, state, {
                hoveredQuestionId: action.questionId
            });
        case Type.TOGGLE_IS_ADDING_QUESTION:
            return Object.assign({}, state, {
                isAddingQuestion: action.isAddingQuestion
            });
        case Type.SET_QUESTION_TO_VIEW:
            return Object.assign({}, state, {
                questionToView: action.question
            });
        default:
            return state;
    }
}

export default question;