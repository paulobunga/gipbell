import React from 'react';
import * as actionCreators from '../../actions';
import { connect } from 'react-redux';

class AuthChecker extends React.Component {

    componentDidMount() {
        if (this.props.isAuthorized) {
            this.props.onAuthorized();
        } else {
            this.props.onNotAuthorized();
        }
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => state.user;

export default connect(
    mapStateToProps,
    actionCreators,
)(AuthChecker);
