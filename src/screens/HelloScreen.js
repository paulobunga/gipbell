import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Button, Text } from 'native-base';
import * as variables from '../style/variables';


class SignInScreen extends React.Component {
    render() {
        return (
            <View style={style.container}>
                <Text style={style.header}>
                    Welcome to the <Text style={style.appName}>Gipbell</Text> App
                </Text>
                <Text style={style.subHeader}>Here You can:</Text>
                <View style={style.buttonsContainer}>
                    <Button
                        onPress={() => this.props.navigation.navigate('SignIn')}
                        block
                        light
                        style={style.firstButton}
                    >
                        <Text>Sign In</Text>
                    </Button>
                    <Button
                        onPress={() => this.props.navigation.navigate('SignUp')}
                        block
                        light
                    >
                        <Text>Create new account</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: variables.primaryBgColor,
    },
    header: {
        fontSize: variables.fontXXXLarge,
        color: variables.lightTextColor,
        textAlign: 'center',
        lineHeight: 55,
        marginBottom: 30,
        marginTop: 40
    },
    appName: {
        fontSize: variables.fontXXXLarge,
        color: variables.lightTextColor,
        fontWeight: '500'
    },
    subHeader: {
        fontSize: variables.fontLarge,
        color: variables.lightTextColor,
        textAlign: 'center',
        marginBottom: 10
    },
    buttonsContainer: {
        width: '90%',
        justifyContent: 'center'
    },
    firstButton: {
        marginBottom: 10,
        color: variables.primaryTextColor
    }
});

export default SignInScreen;
