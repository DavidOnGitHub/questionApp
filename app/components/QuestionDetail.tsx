import * as React from 'react';
import {Button} from 'react-bootstrap';
import {IQuestion} from '../models/Question';
import AnswerList from './AnswerList';

interface IProps {
    question: IQuestion
    hideDetails(): void
    showDetails: boolean
}

class QuestionDetail extends React.Component<IProps, any> {
    constructor(props) {
        super(props);
        this.closeDetail = this.closeDetail.bind(this);
    }
    
    closeDetail() {
        this.props.hideDetails();
    }
    
    render() {
        const {question} = this.props;
        if (!this.props.showDetails) {
            return null;
        }
        return (
            <div className='question-detail'>
                <div className='top-right-close-button'>
                     <Button bsStyle='link' onClick={this.closeDetail}>x</Button>
                </div>
                <div className='question-content'>
                    <p>{question.content}</p>
                    <p>tags: {question.tags.toString()}</p>
                </div>
                <div className='answer-section'>
                    <AnswerList question={question}/>
                </div>
            </div>
        );
    }
}

export default QuestionDetail;