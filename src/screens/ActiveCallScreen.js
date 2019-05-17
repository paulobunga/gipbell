import React from 'react';
import ActiveCall from '../containers/ActiveCall';

class ActiveCallScreen extends React.Component {

    onCallEnded = () => {
        this.props.navigation.popToTop();
    };

    render() {
        return (
            <ActiveCall onCallEnded={this.onCallEnded}/>
        );
    }
}

export default ActiveCallScreen;
