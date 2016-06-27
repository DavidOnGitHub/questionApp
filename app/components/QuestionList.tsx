import * as React from 'react';
import * as classNames from 'classnames';
import {IQuestion} from '../models/Question';
import {log} from '../utils/debugUtils';

interface IProps {
    questions: Array<IQuestion>
    selectedItemId: string
    hoveredItemId: string
    onItemEnter(id: string): void
    onItemSelect(id: string): void
}

class QuestionList extends React.Component<IProps, any> {
    constructor(props) {
        super(props);
    }
    onItemEnter(id: string) {
        this.props.onItemEnter(id);
    }
    onItemSelect(id: string) {
        this.props.onItemSelect(id);
    }
    render() {
        const {questions, selectedItemId, hoveredItemId} = this.props;
        // const listClass = classNames({
        //     'list-group-item': true,
        //     'question-selected': this.state.selectedItemId === question.id
        // })
        return (
            <div className='question-list'>
                <ul className='list-group'>
                    {
                        questions.map((question, index) => (
                            <li key={index} 
                                onMouseEnter={(event) => this.onItemEnter(question.id)}
                                onClick={(event) => this.onItemSelect(question.id)}
                                className={`list-group-item 
                                    ${(selectedItemId === question.id) && 'question-item-selected'}
                                    ${(hoveredItemId === question.id && selectedItemId !== question.id) && 'question-item-hovered'}`}>{question.title}</li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default QuestionList;