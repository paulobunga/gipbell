import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import ForeignProfile from '../containers/ForeignProfile';

class ForeignProfileScreen extends React.Component {

    render() {
        return (
            <View style={style.container}>
                <ForeignProfile user_id={this.props.navigation.getParam('user_id')}/>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ForeignProfileScreen;
