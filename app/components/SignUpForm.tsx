import * as React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Button} from 'react-bootstrap';

import {log} from '../utils/debugUtils';

import {Troolean} from '../constants/Troolean';
import * as notice from '../utils/noticeUtils';
import {validateEmailFormat, checkAccountAvailability} from '../utils/validateUtils';

import {IField} from '../models/FormAction';

import {signUpAccount} from '../actions/accountAction';
import FormInput from './FormInput';
import {toggleLoginPopup} from '../actions/displayAction';

interface IProps {
    email: IField,
    actions: {
        signUp(email: string): Promise<any>,
        hideLoginPopup(): void
    },
}

class SignUpForm extends React.Component<IProps, any> {
    constructor() {
        super();

        this.signUp = this.signUp.bind(this);
    }
    
    signUp(event) {
        event.preventDefault();
        const {email, actions} = this.props;
        
        if (email.isValid && Troolean.isTrue(email.isAsyncValid) && !email.isAsyncValidating) {
            actions.signUp(email.value)
                .then(() => {
                    actions.hideLoginPopup();
                    notice.showSuccess('Thank you for signing up. Please check your email to finish registration');
                    this.setState({
                        email: ''
                    });
                    browserHistory.push('/');
                })
                .catch((error) => {
                    notice.showError(`debug error ${error.message}`);
                });
        }
    }
    
    render() {
        const {actions} = this.props;
        
        return (
            <div>
                <form onSubmit={this.signUp}>
                    <FormInput formName='signUpForm' fieldName='email'
                               placeholderText='email'
                               validateErrorMessage='Not a valid email address'
                               asyncValidateErrorMessage='Email has already been registered'
                               validateFunction={validateEmailFormat}
                               asyncValidateFunction={checkAccountAvailability}/>
                    <Button type='submit'>Sign up</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    email: state.form.signUpForm.email
});

const mapDispatchToProps = (dispatch) => ({
    actions: {
        signUp: (email) => dispatch(signUpAccount(email)),
        hideLoginPopup: () => dispatch(toggleLoginPopup(false))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);