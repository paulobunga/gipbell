import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import CodeGenerator from '../containers/CodeGenerator';

class CodeGeneratorScreen extends React.Component {

    render() {
        return (
            <View style={style.container}>
                <CodeGenerator />
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default CodeGeneratorScreen;
