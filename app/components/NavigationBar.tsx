import * as React from 'react';
import {connect} from 'react-redux';
import {Button, Navbar, Nav, NavItem, Modal} from 'react-bootstrap';
import {Link} from 'react-router';
import RegisterModal from './RegisterModal';
import SignUpForm from './SignUpForm';
import Login from './Login';

class NavigationBar extends React.Component<any, any> {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <Navbar>
                    <Nav>
                        <Link to='password'>Password</Link>
                    </Nav>
                    <Nav pullRight>
                        <Login />
                        {!this.props.currentAccount && <SignUpForm/>}
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentAccount: state.account.currentAccount
});

export default connect(mapStateToProps)(NavigationBar);