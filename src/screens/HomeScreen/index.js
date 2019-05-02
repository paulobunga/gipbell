import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from "react-redux";
import * as actionCreators from "../../actions";

class HomeScreen extends React.Component {

    logout = e => {
        this.props.logout();
        this.props.navigation.navigate('Auth');
    };

    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text>Home Screen</Text>
                <Text>{this.props.user_display_name}</Text>
                <Button onPress={this.logout} title={'Logout'}/>
            </View>
        );
    }
}

const mapStateToProps = state => state.user;

export default connect(
    mapStateToProps,
    actionCreators,
)(HomeScreen);
