import React from 'react';
import CodeScanner from '../containers/CodeScanner';

class CodeScannerScreen extends React.Component {

    onSuccessRead(user_id) {
        this.props.navigation.replace('ForeignProfile', { user_id });
    }

    render() {
        return (
            <CodeScanner onSuccessRead={this.onSuccessRead.bind(this)}/>
        );
    }
}

export default CodeScannerScreen;
