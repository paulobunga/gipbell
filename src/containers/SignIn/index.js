import React from 'react';
import { Text, View, Button } from 'react-native';
import * as actionCreators from '../../actions';
import { connect } from 'react-redux';

class SignIn extends React.Component {
    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <Text>Sign In</Text>
            </View>
        )
    }
}

const mapStateToProps = state => state.user;

export default connect(
    mapStateToProps,
    actionCreators,
)(SignIn);
