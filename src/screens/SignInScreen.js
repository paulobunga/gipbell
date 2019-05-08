import React from 'react';
import SignInForm from '../containers/SignInForm';
import { View, Text, StyleSheet } from 'react-native';
import * as variables from '../style/variables';

class SignInScreen extends React.Component {
    render() {
        return (
            <View style={style.container}>
                <Text style={style.header}>Sign In</Text>
                <SignInForm onLogin={() => this.props.navigation.navigate('App')}/>
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

export default SignInScreen;
