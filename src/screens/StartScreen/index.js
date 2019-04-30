import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles';
import { Voximplant } from 'react-native-voximplant';
const client = Voximplant.getInstance();
console.log(client);

export default class App extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Start screen</Text>
                <Button onPress={() => this.props.navigation.navigate('Login')} title={"Login"}></Button>
                <Button onPress={() => this.props.navigation.navigate('CodeScanner')} title={"Scan QR Code"}></Button>
            </View>
        );
    }
}
