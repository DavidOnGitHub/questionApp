import * as React from 'react';
import {connect} from 'react-redux';
import '../styles/main.scss';
import NavigationBar from './NavigationBar';
import {loadCurrentUser} from '../actions/accountAction';
import {toggleLoginPopup} from '../actions/displayAction';
import LoginPopup from './LoginPopup';
import {log} from '../utils/debugUtils';

interface IProps {
    showLoginPopup: boolean,
    actions: {
        loadCurrentUser(): void,
        toggleLoginPopup(showLoginPopup): void
    }
}
class App extends React.Component<any, any> {
    constructor() {
        super();
        this.hidePopup = this.hidePopup.bind(this);
    }
    componentWillMount() {
        this.props.actions.loadCurrentUser();
    }
    hidePopup() {
        this.props.actions.toggleLoginPopup(false);
    }
    render() {
        const {showLoginPopup} = this.props;

        return (
            <div>
                <NavigationBar/>
                <div>
                    {this.props.children}
                </div>
                <LoginPopup show={showLoginPopup} onHide={this.hidePopup}/>;
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    showLoginPopup: state.display.showLoginPopup
});
const mapDispatchToProps = (dispatch) => ({
    actions: {
        loadCurrentUser: () => dispatch(loadCurrentUser()),
        toggleLoginPopup: (showLoginPopup) => dispatch(toggleLoginPopup(showLoginPopup))
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(App);