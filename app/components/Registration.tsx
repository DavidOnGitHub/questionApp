import * as React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Button} from 'react-bootstrap';

import {Troolean} from '../constants/Troolean';
import {IXError} from '../models/XError';
import {IField} from '../models/FormAction';
import {validateUsername, validatePassword, checkAccountAvailability} from '../utils/validateUtils';
import * as notice from '../utils/noticeUtils';

import {registerAccount} from '../actions/accountAction';
import FormInput from './FormInput';


interface IProps {
    username: IField,
    mainPassword: IField,
    confirmPassword: IField,
    showMainPassword: IField,
    showConfirmPassword: IField,
    actions: {
        register(accountDetails): Promise<any>
    },
    location?: any
}

class Registration extends React.Component<IProps, any> {
    constructor() {
        super();
        this.register = this.register.bind(this);
        this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
    }
    
    validateConfirmPassword(confirmPassword: string) {
        return this.props.mainPassword.value === confirmPassword;
    }
    
    register() {
        const {email, activationToken} = this.props.location.query;
        const {username, mainPassword, confirmPassword} = this.props;
        
        if (username.isValid && Troolean.isTrue(username.isAsyncValid) && mainPassword.isValid && confirmPassword.isValid) {
            const password = mainPassword.value;
            this.props.actions.register({
                email, 
                username: username.value,
                password, 
                activationToken})
                .then(() => {
                    notice.showSuccess('Congratulations! You have registered successfully. You can login now!');
                    browserHistory.push('/');
                })
                .catch((error: IXError) => {
                    notice.showError(`debug error ${error.message}`);
                });
        }
    }
    
    render() {
        const {showMainPassword, showConfirmPassword} = this.props;
        const mainPasswordType = showMainPassword.value ? 'text' : 'password';
        const confirmPasswordType = showConfirmPassword.value ? 'text' : 'password';
        return (
            <div>
                <form>
                    <fieldset>
                        <label htmlFor='username'>User name: </label>
                        <FormInput formName='registrationForm'
                                    fieldName='username'
                                    placeholderText='unique user name'
                                    validateFunction={validateUsername}
                                    validateErrorMessage='Invalid user name'
                                    asyncValidateFunction={checkAccountAvailability}
                                    asyncValidateErrorMessage='User name has already been registered'
                                    />
                    </fieldset>
                    <fieldset>
                        <label htmlFor='mainPassword'>Password: </label>
                        <FormInput formName='registrationForm'
                                   fieldName='mainPassword'
                                   type={mainPasswordType}
                                   validateFunction={validatePassword}
                                   validateErrorMessage='Invalid password'
                                   />
                        <FormInput formName='registrationForm'
                                   fieldName='showMainPassword'
                                   type='checkbox'
                                   />
                        <label htmlFor='showMainPassword'>show</label>
                    </fieldset>
                    <fieldset>
                        <label htmlFor='confirmPassword'>Confirm Password: </label>
                        <FormInput formName='registrationForm'
                                    fieldName='confirmPassword'
                                    type={confirmPasswordType}
                                    validateFunction={this.validateConfirmPassword}
                                    showIconForValidation={true}
                                    immediateValidate={true}
                                    />
                        <FormInput formName='registrationForm'
                                   fieldName='showConfirmPassword'
                                   type='checkbox'
                                   />
                        <label htmlFor='showConfirmPassword'>show</label>
                    </fieldset>
                    <Button onClick={this.register}>Submit</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    username: state.form.registrationForm.username,
    mainPassword: state.form.registrationForm.mainPassword,
    confirmPassword: state.form.registrationForm.confirmPassword,
    showConfirmPassword: state.form.registrationForm.showConfirmPassword,
    showMainPassword: state.form.registrationForm.showMainPassword
});

const mapDispatchToProps = (dispatch) => ({
    actions: {
        register: (accountDetails) => dispatch(registerAccount(accountDetails))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Registration);