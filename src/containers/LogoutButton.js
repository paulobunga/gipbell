import React from 'react';
import { Button, Text } from 'native-base';
import { connect } from "react-redux";
import * as actionCreators from "../actions";

const LogoutButton = props => {

    const onPress = () => {
        props.logout();
        props.onLogout();
    };

    return (
        <Button
            block
            primary
            onPress={onPress}
            style={props.style}
        >
            <Text>Logout</Text>
        </Button>
    )
};

const mapStateToProps = state => state.user;

export default connect(
    mapStateToProps,
    actionCreators,
)(LogoutButton);
