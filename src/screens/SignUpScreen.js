import React from 'react';
import SignUpForm from '../containers/SignUpForm';
import { View, Text, StyleSheet } from 'react-native';
import * as variables from '../style/variables';

class SignUpScreen extends React.Component {
    render() {
        return (
            <View style={style.container}>
                <Text style={style.header}>Sign Up</Text>
                <SignUpForm onLogin={() => this.props.navigation.navigate('App')}/>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        fontSize: variables.fontXXLarge,
        color: variables.darkTextColor,
        marginBottom: 40
    }
});

export default SignUpScreen;
