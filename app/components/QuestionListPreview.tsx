import * as React from 'react';
import {connect} from 'react-redux';

import QuestionList from './QuestionList';
import QuestionModal from './QuestionModal';
import QuestionDetail from './QuestionDetail';
import {Modal, Button} from 'react-bootstrap';
import {IQuestion, Question} from '../models/Question';
import * as questionAction from '../actions/questionAction';
import {fetchAllTags} from '../actions/tagAction';
import {toggleQuestionPopup, toggleLoginPopup} from '../actions/displayAction';

interface IProps {
    questions: Array<IQuestion>,
    selectedQuestionId: string,
    hoveredQuestionId: string,
    allTags: Array<string>,
    currentAccount: any,
    actions: {
        addQuestion(question: IQuestion): Promise<any>,
        fetchQuestion(): Promise<any>,
        selectQuestion(questionId: string),
        hoverOverQuestion(questionId: string),
        setQuestionToView(question: IQuestion),
        fetchAllTags(): Promise<Array<string>>,
        toggleQuestionPopup(showQuestionPopup: boolean): void,
        toggleLoginPopup(showLoginPopup: boolean): void
    }
}

interface IState {
    isShowQuestionDetails?: boolean
}

class QuestionListPreview extends React.Component<IProps, IState> {
    constructor(props){
        super(props);
        this.state = {
            isShowQuestionDetails: false
        }
        this.onQuestionItemSelect = this.onQuestionItemSelect.bind(this);
        this.openModal = this.openModal.bind(this);
        // this.toggleAddButton = this.toggleAddButton.bind(this);
        this.hideQuestionDetails = this.hideQuestionDetails.bind(this);
    }
    componentDidMount() {
        this.props.actions.fetchQuestion().then(() => this.props.actions.fetchAllTags());
    }
    openModal() {
        const {actions} = this.props;
        actions.setQuestionToView(new Question());
        actions.toggleQuestionPopup(true);
    }
    onQuestionItemSelect(id: string) {
        this.props.actions.selectQuestion(id);
        this.setState({
            isShowQuestionDetails: true
        });
    }
    getSelectedQuestion(): IQuestion {
        return this.props.questions.find((question) => (question.id === this.props.selectedQuestionId));
    }
    hideQuestionDetails() {
        this.setState({
            isShowQuestionDetails: false
        });
    }
    render() {
        const {questions, allTags, hoveredQuestionId, selectedQuestionId, actions} = this.props;
        const {isShowQuestionDetails} = this.state;
        return (
            <div>
                <div>
                    <Button onClick={this.openModal}>Add Question</Button>
                </div>
                <div className='container flex-container' >
                    <div className='flex-container-vertical question-list-detail'>
                        <QuestionList questions={questions}
                                      selectedItemId={selectedQuestionId}
                                      hoveredItemId={hoveredQuestionId}
                                      onItemEnter={actions.hoverOverQuestion}
                                      onItemSelect={this.onQuestionItemSelect}/> 
                        
                        <QuestionDetail question={this.getSelectedQuestion()} 
                                        hideDetails={this.hideQuestionDetails}
                                        showDetails={isShowQuestionDetails}/>
                    </div>
                    
                    <QuestionModal/>
                </div> 
            </div>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.question.questions,
        allTags: state.tag.allTags,
        selectedQuestionId: state.question.selectedQuestionId,
        hoveredQuestionId: state.question.hoveredQuestionId,
        currentAccount: state.account.currentAccount
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: {
        addQuestion: (question) => dispatch(questionAction.addQuestion(question)),
        fetchQuestion: () => dispatch(questionAction.fetchQuestion()),
        selectQuestion: (questionId: string) => dispatch(questionAction.selectQuestion(questionId)),
        hoverOverQuestion: (questionId: string) => dispatch(questionAction.hoverOverQuestion(questionId)),
        setQuestionToView: (question: IQuestion) => dispatch(questionAction.setQuestionToView(question)),
        fetchAllTags: () => dispatch(fetchAllTags()),
        toggleQuestionPopup: (showQuestionPopup) => dispatch(toggleQuestionPopup(showQuestionPopup)),
        toggleLoginPopup: (showLoginPopup: boolean) => dispatch(toggleLoginPopup(showLoginPopup))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionListPreview);
    