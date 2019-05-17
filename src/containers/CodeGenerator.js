import React from 'react';
import { StyleSheet } from 'react-native';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import { CameraRoll , ToastAndroid } from "react-native"
import RNFS from "react-native-fs"
import { View, Text, Button } from 'native-base';
import { PermissionsAndroid } from 'react-native';
import appIconBase64 from '../assets/icons/appIconBase64-black';

class CodeGenerator extends React.Component {

    state = {
        isSaving: false
    };

    async requestPermission() {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
    }

    async saveQrToDisk() {
        this.setState({
            isSaving: true
        });
        await this.requestPermission();
        this.svg.toDataURL((data) => {
            RNFS.writeFile(RNFS.CachesDirectoryPath+"/Gipbell-QR-code.png", data, 'base64')
                .then((success) => {
                    return CameraRoll.saveToCameraRoll(RNFS.CachesDirectoryPath+"/Gipbell-QR-code.png", 'photo')
                })
                .then(() => {
                    this.setState({
                        isSaving: false
                    });
                    ToastAndroid.show('Saved to gallery!!!', ToastAndroid.SHORT)
                })
                .catch(e => {
                    ToastAndroid.show(e.message, ToastAndroid.SHORT)
                })
        })
    }

    render() {
        return (
            <View style={style.container}>
                <QRCode
                    value={JSON.stringify({user_id: this.props.user_id})}
                    logo={{ uri: appIconBase64 }}
                    logoSize={60}
                    getRef={(c) => (this.svg = c)}
                    size={300}
                />
                <Button
                    block
                    primary
                    style={style.button}
                    onPress={() => this.saveQrToDisk()}
                    disabled={this.state.isSaving}
                >
                    <Text>Save to gallery</Text>
                </Button>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        justifyContent: 'center'
    },
    button: {
        marginTop: 30
    }
});

const mapStateToProps = state => state.user;

export default connect(
    mapStateToProps,
    actionCreators,
)(CodeGenerator);
