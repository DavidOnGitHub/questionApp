import * as React from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import FormInput from './FormInput';
import {IField} from '../models/FormAction';
import {login, logout} from '../actions/accountAction';
import {log} from '../utils/debugUtils';
import {showError, showSuccess} from '../utils/noticeUtils';
import {toggleLoginPopup} from '../actions/displayAction';

interface IProps {
    accountName: IField,
    password: IField,
    currentAccount: Object,
    actions: {
        login(credentials: {accountName: string, password: string}): Promise<any>,
        logout(): void,
        hideLoginPopup(): void
    }
}
class Login extends React.Component<IProps, any> {
    constructor() {
        super();

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login(event) {
        event.preventDefault();
        const {accountName, password, actions} = this.props;
        if (accountName.value && password.value) {
            actions.login({
                accountName: accountName.value,
                password: password.value
            }).then(() => {
                actions.hideLoginPopup();
                showSuccess('You have successfully logged in');
            }, (error) => {
                showError(error.message);
            });
        }
    }

    logout() {
        this.props.actions.logout();
        showSuccess('You have successfully logged out');
    }

    render() {
        const {currentAccount} = this.props;

        return (
            <div>
                {!currentAccount && <form onSubmit={this.login}>
                    <FormInput formName='loginForm' fieldName='accountName'
                               placeholderText='email or user name'
                               />
                    <FormInput formName='loginForm' fieldName='password'
                               placeholderText='password'
                               type='password'
                               />
                    <Button type='submit'>Log in</Button>
                </form>}
                {currentAccount && <Button bsStyle='link' onClick={this.logout}>Log out</Button>}
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        accountName: state.form.loginForm.accountName,
        password: state.form.loginForm.password,
        currentAccount: state.account.currentAccount
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            login: (credentials: {accountName: string, password: string}) => dispatch(login(credentials)),
            logout: () => dispatch(logout()),
            hideLoginPopup: () => dispatch(toggleLoginPopup(false))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);