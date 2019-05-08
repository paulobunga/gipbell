import React from 'react';
import { ToastAndroid } from "react-native";

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class CodeScanner extends React.Component {

    onScan(e) {
        const obj = JSON.parse(e.data);
        const { user_id } = obj;
        if (!user_id) {
            ToastAndroid.show('Invalid QR code', ToastAndroid.SHORT);
            setTimeout(() => {
                this.scanner.reactivate();
            }, 4000);
        }
        this.props.onSuccessRead(user_id);
    }

    render() {
        return (
            <QRCodeScanner
                onRead={e => this.onScan(e)}
                ref={c => this.scanner = c}
            />
        );
    }
}
