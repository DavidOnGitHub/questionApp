import * as React from 'react';
import {Button, Modal} from 'react-bootstrap';

interface IProps {
    show: boolean
    onHide(): void
}
class RegisterModal extends React.Component<IProps, any> {
    render() {
        const {show, onHide} = this.props;
        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    Footer
                </Modal.Footer>
            </Modal>
        );
    }
}

export default RegisterModal;