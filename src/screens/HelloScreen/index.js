import React from 'react';
import { View, Text, Button } from 'react-native';

class SignInScreen extends React.Component {
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text>Hello!!!</Text>
                <Button title={'Sign In'} onPress={() => this.props.navigation.navigate('SignIn')} />
                <Button title={'Sign Up'} onPress={() => this.props.navigation.navigate('SignUp')} />
            </View>
        );
    }
}

export default SignInScreen;
