import * as React from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import {IQuestion, Question} from '../models/Question';
import {addQuestion, setIsAddingQuestion, setQuestionToView} from '../actions/questionAction';
import {resetField} from '../actions/formActions';
import {toggleQuestionPopup, toggleLoginPopup} from '../actions/displayAction';
import TagsBox from './TagsBox';
import FormInput from './FormInput';
import {IField} from '../models/FormAction';
import {required} from '../utils/validateUtils';
import {log} from '../utils/debugUtils';
import {showSuccess, showError} from '../utils/noticeUtils';
import {XError} from '../models/XError';
import {contains} from '../utils/collectionUtils';
import {onChange} from '../actions/formActions';

interface IProps {
    currentAccount: any,
    titleField: IField,
    contentField: IField,
    showModal: boolean,
    question: IQuestion,
    allTags: Array<string>,
    actions: {
        addQuestion(question: IQuestion): Promise<any>,
        resetField(formName: string, fieldName: string): void,
        toggleQuestionPopup(showQuestionPopup: boolean): void
        toggleLoginPopup(showLoginPopup: boolean): void,
        setIsAddingQuestion(isAddingQuestion: boolean): void,
        setQuestionToView(question: IQuestion): void,
        setFormField(fieldName: string, value: any): void
    }
}
const formName = 'questionForm';

class QuestionModal extends React.Component<IProps, any> {
    
    constructor(props) {
        super(props);
        // this.state = {
        //     question: this.props.question
        // };
        this.onTagsChange = this.onTagsChange.bind(this);
        this.submitQuestion = this.submitQuestion.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.initializeFormData = this.initializeFormData.bind(this);
    }
    
    onTagsChange(tags) {
        const question = this.state.question;
        question.tags = tags;
        // this.setState({question});
    }

    closeModal() {
        const {resetField, toggleQuestionPopup, setIsAddingQuestion} = this.props.actions;
        toggleQuestionPopup(false);
        resetField(formName, 'title');
        resetField(formName, 'content');
        setIsAddingQuestion(false);
    }
    
    submitQuestion(event): void {
        event.preventDefault();
        const {titleField, contentField, currentAccount, actions} = this.props;
        const {question} = this.props;
        if (!currentAccount) {
            this.closeModal();
            this.props.actions.toggleLoginPopup(true);
            return;
        }
        if (titleField.isValid && contentField.isValid) {
            question.accountId = currentAccount.user.id;
            question.title = titleField.value;
            question.content = contentField.value;
            actions.addQuestion(question).then(() => {
                this.closeModal();
                showSuccess('Question successfully added');
            }, (error: XError) => {
                if (error.isUnAuthorized) {
                    this.closeModal();
                } else {
                    showError(error.message);
                }
            });
        }
    }

    initializeFormData() {
        const {question, actions} = this.props;
        actions.setFormField('title', question.title);
        actions.setFormField('content', question.content);
        actions.setFormField('tags', question.tags);
    }

    resetQuestionFields() {
        const {resetField} = this.props.actions;
        resetField(formName, 'title');
        resetField(formName, 'content');
    }
    
    render() {
        const {allTags, showModal, question} = this.props;
        // const {question} = this.state;
        
        return (
            <div>
                <Modal show={showModal} onHide={this.closeModal} onEnter={this.initializeFormData}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Question</Modal.Title>
                    </Modal.Header>
                    <form className='form' role='form' onSubmit={this.submitQuestion}>
                        <Modal.Body>
                            <fieldset className='form-group'>
                                <label htmlFor='title'>Title</label>
                                <FormInput formName={formName} fieldName='title' classes='form-control'
                                            placeholderText='title here'
                                            validateFunction={required}
                                            validateErrorMessage='Title is required'/>
                            </fieldset>
                            <fieldset className='form-group'>
                                <FormInput formName={formName} fieldName='content' classes='form-control question-content-input'
                                            placeholderText='content here'
                                            isTextArea={true}
                                            validateFunction={required}
                                            validateErrorMessage='Content is required'/>
                            </fieldset>
                            <fieldset className='form-group'>
                                <label htmlFor="tags">Tags: </label>
                                <TagsBox formName={formName} allTags={allTags}/>
                            </fieldset>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type='submit'>Submit</Button>
                            <Button onClick={this.closeModal}>Close</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => ({
    currentAccount: state.account.currentAccount,
    titleField: state.form.questionForm.title,
    contentField: state.form.questionForm.content,
    question: state.question.questionToView,
    allTags: state.tag.allTags,
    showModal: state.display.showQuestionPopup
});

const mapDispatchToProps = (dispatch) => ({
    actions: {
        addQuestion: (question: IQuestion) => dispatch(addQuestion(question)),
        resetField: (formName, fieldName) => dispatch(resetField(formName, fieldName)),
        toggleQuestionPopup: (showQuestionPopup: boolean) => dispatch(toggleQuestionPopup(showQuestionPopup)),
        toggleLoginPopup: (showLoginPopup: boolean) => dispatch(toggleLoginPopup(showLoginPopup)),
        setIsAddingQuestion: (isAddingQuestion: boolean) => dispatch(setIsAddingQuestion(isAddingQuestion)),
        setQuestionToView: (question: IQuestion) => dispatch(setQuestionToView(question)),
        setFormField: (fieldName: string, value) => dispatch(onChange(formName, fieldName, value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionModal);