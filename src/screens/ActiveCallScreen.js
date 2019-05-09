import React from 'react';
import ActiveCall from '../containers/ActiveCall';

class ActiveCallScreen extends React.Component {

    onCallEnded = () => {
        this.props.navigation.replace('Home');
    };

    render() {
        return (
            <ActiveCall onCallEnded={this.onCallEnded}/>
        );
    }
}

export default ActiveCallScreen;
