import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class LoginScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Login screen</Text>
            </View>
        );
    }
}

export default LoginScreen;
