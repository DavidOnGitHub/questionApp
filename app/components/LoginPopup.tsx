import * as React from 'react';
import {Button, Modal} from 'react-bootstrap';
import Login from './Login';
import SignUpForm from './SignUpForm';

interface IProps {
    show: boolean
    onHide(): void
}
class LoginModal extends React.Component<IProps, any> {
    render() {
        const {show, onHide} = this.props;
        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>You haven't logged in or your session has expired, please login or sign up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Login />
                        <SignUpForm/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default LoginModal;