import * as React from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {IQuestion} from '../models/Question';
import {IAnswer, Answer} from '../models/Answer';
import FormInput from './FormInput';
import {addAnswer, fetchAnswers} from '../actions/answerAction';
import {IField} from '../models/FormAction';

interface IProps {
    question: IQuestion,
    answers: Array<IAnswer>,
    currentAccount: any,
    contentField: IField,
    actions: {
        addAnswer(answer: IAnswer): Promise<any>,
        fetchAnswers(questionId: string): Promise<Array<Answer>>
    }
}
class AnswerList extends React.Component<IProps, any> {
    constructor() {
        super();
        this.addAnswer = this.addAnswer.bind(this);
    }
    componentWillMount() {
        this.props.actions.fetchAnswers(this.props.question.id);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.question.id !== this.props.question.id) {
            this.props.actions.fetchAnswers(nextProps.question.id);
        }
    }
    
    addAnswer(event) {
        event.preventDefault();
        const {currentAccount, question, contentField} = this.props;
        const accountId = currentAccount.user.id;
        const username = currentAccount.username;
        const content = contentField.value;

        const answer = new Answer(question.id);
        Object.assign(answer, {content, accountId});

        if (answer.content && answer.content.trim()) {
            return this.props.actions.addAnswer(answer);
        }
    }
    render() {
        const {answers, currentAccount} = this.props;
        return (
            <div>
                <p>{answers.length} Answers</p>
                <ul>
                    {
                        answers.map((answer) => {
                            const formattedTime = answer.createdTime ? `${answer.createdTime.getFullYear()}-${answer.createdTime.getMonth() + 1}-${answer.createdTime.getDate()}` : null;
                            return (
                                <div className='answer-item' key={answer.id}>
                                    <div className='answer-item-content'>
                                        <p>{answer.content}</p>
                                    </div>
                                    <div className='answer-item-metadata'>
                                        <span>   {answer.metadata.username} at {formattedTime}</span>
                                    </div>
                                </div>
                            );
                        })
                    }
                </ul>
                {currentAccount && <div className='your-answer'>
                    <form onSubmit={this.addAnswer} className='form'>
                        <label>Your answer</label>
                        <FormInput formName='newAnswerForm' fieldName='content'
                                   isTextArea={true}
                                   classes='form-control'/>
                        <Button bsStyle='primary' className='form-control' type='submit'>Submit</Button>
                    </form>
                </div>}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    question: ownProps.question,
    answers: state.answer.answers,
    currentAccount: state.account.currentAccount,
    contentField: state.form.newAnswerForm.content
});

const mapDispatchToProps = (dispatch) => ({
    actions: {
        addAnswer: (answer: IAnswer) => dispatch(addAnswer(answer)),
        fetchAnswers: (questionId: string) => dispatch(fetchAnswers(questionId))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerList);