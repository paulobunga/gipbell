import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import EditInfo from '../containers/EditInfo';

class EditInfoScreen extends React.Component {
    render() {
        return (
            <View style={style.container}>
                <EditInfo />
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

export default EditInfoScreen;
